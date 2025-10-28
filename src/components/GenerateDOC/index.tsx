import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import React, {useState} from "react";
import type { Tab } from "../Card/index.tsx";

interface GenerateDOCProps {
  selections: Record<string, any>;
  totals: number; 
  tabs: Tab[]
  priceTable: Record<string, Record<string, number>>;
  activeTabName: string; 
}

const GenerateDOC: React.FC<GenerateDOCProps> = ({ selections, totals, tabs, priceTable, activeTabName }) => {
  const [pdfTitle, setPdfTitle] = useState("");

  const generatePDF = () => {
    const activeTab = tabs.find((tab) => tab.name === activeTabName);

    if (!activeTab) {
      alert("Erro: Aba ativa não encontrada.");
      return;
    }

    const doc = new jsPDF();
  
    doc.setFont("helvetica", "normal"); 
    doc.setFontSize(12);

    doc.setTextColor(0, 102, 204); 
    doc.setFontSize(16);
    doc.text(pdfTitle || "Resumo do Pedido", 14, 20);
  
    doc.setDrawColor(0, 0, 0); 
    doc.setLineWidth(0.5);
    doc.line(14, 25, 196, 25); 
  
    doc.setTextColor(0, 0, 0); 

    const marginLeft = 14;
    let currentY = 30;
    const rowHeight = 8; 

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold"); 
    doc.text("Campo", marginLeft, currentY);
    doc.text("Valor", 80, currentY);
    doc.text("Preço", 150, currentY);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal"); 
    currentY += rowHeight; 

    let hasSelectedItems = false; 

    activeTab.fields.forEach((field) => {
        const value = selections[field.key]; 

        if (value === null || value === undefined) return;
        if (typeof value === 'boolean' && !value) return;
        if (Array.isArray(value) && value.length === 0) return;
        if (typeof value === 'string' && value.trim() === '') return;

        hasSelectedItems = true; 

        if (Array.isArray(value)) {
          value.forEach((arrayItem) => {
            const formattedValue = arrayItem.toString();
            const itemPrice = priceTable[field.key]?.[formattedValue];
            const priceText = (itemPrice !== null && itemPrice !== undefined) ? `R$${itemPrice.toFixed(2).replace('.', ',')}` : "Não Disponível";

            const fieldLabelSplit = doc.splitTextToSize(field.label, 60); 
            const formattedValueSplit = doc.splitTextToSize(formattedValue, 65); 
            const maxLines = Math.max(fieldLabelSplit.length, formattedValueSplit.length, 1);
            doc.text(fieldLabelSplit, marginLeft, currentY);
            doc.text(formattedValueSplit, 80, currentY);
            doc.text(priceText, 150, currentY);
            currentY += rowHeight * maxLines; 
          });

        } else {
          let formattedValue: string;
          let priceLookupKey: string; 

          if (typeof value === 'boolean') {
            formattedValue = field.label; 
            priceLookupKey = 'true';
          } else {
            formattedValue = value.toString();
            priceLookupKey = formattedValue;
          }

          const itemPrice = priceTable[field.key]?.[priceLookupKey];
          const priceText = (itemPrice !== null && itemPrice !== undefined) ? `R$${itemPrice.toFixed(2).replace('.', ',')}` : "Não Disponível";

          const fieldLabelSplit = doc.splitTextToSize(field.label, 60);
          const formattedValueSplit = doc.splitTextToSize(formattedValue, 65);
          const maxLines = Math.max(fieldLabelSplit.length, formattedValueSplit.length, 1);
          doc.text(fieldLabelSplit, marginLeft, currentY);
          doc.text(formattedValueSplit, 80, currentY);
          doc.text(priceText, 150, currentY);
          currentY += rowHeight * maxLines;
        }
      });
    
    if (hasSelectedItems) {
        doc.setFont("helvetica", "bold"); 
        currentY += rowHeight / 2; 
        doc.line(14, currentY, 196, currentY); 
        currentY += rowHeight;
        doc.text("Total", marginLeft, currentY);
        doc.text(`R$${totals.toFixed(2).replace('.', ',')}`, 150, currentY);
        currentY += rowHeight;
    } 

    doc.setDrawColor(0, 0, 0);
    doc.line(14, currentY, 196, currentY); 
    const fileName = pdfTitle.trim() ? `${pdfTitle}.pdf` : "ResumoPedido.pdf";
    doc.save(fileName);
  };

  const generateXLSX = () => {
    const activeTab = tabs.find((tab) => tab.name === activeTabName);

    if (!activeTab) {
      console.error("Aba ativa não encontrada para XLSX.");
      return;
    }

    const data = [
      ["Campo", "Tipo", "Valor", "Preço"]
    ];
    let hasSelectedItems = false;

    activeTab.fields.forEach((field) => {
        const value = selections[field.key];
        
        if (value === null || value === undefined) return;
        if (typeof value === 'boolean' && !value) return;
        if (Array.isArray(value) && value.length === 0) return;
        if (typeof value === 'string' && value.trim() === '') return;

        hasSelectedItems = true;

        if (Array.isArray(value)) {
          value.forEach((arrayItem) => {
            const formattedValue = arrayItem.toString();
            const itemPrice = priceTable[field.key]?.[formattedValue];
            const priceText = (itemPrice !== null && itemPrice !== undefined) ? `R$${itemPrice.toFixed(2).replace('.', ',')}` : "Não Disponível";
            data.push([field.label, field.type, formattedValue, priceText]);
          });
        } else {
          let formattedValue: string;
          let priceLookupKey: string; 

          if (typeof value === 'boolean') {
            formattedValue = field.label; 
            priceLookupKey = 'true';
          } else {
            formattedValue = value.toString();
            priceLookupKey = formattedValue;
          }

          const itemPrice = priceTable[field.key]?.[priceLookupKey];
          const priceText = (itemPrice !== null && itemPrice !== undefined) ? `R$${itemPrice.toFixed(2).replace('.', ',')}` : "Não Disponível";
          data.push([field.label, field.type, formattedValue, priceText]);
        }
      });      

    if (hasSelectedItems || totals > 0) {
      data.push(["Total", "", "", `R$${totals.toFixed(2).replace('.', ',')}`]); 
    }

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Resumo");
    const fileName = pdfTitle.trim() ? `${pdfTitle}.xlsx` : "ResumoPedido.xlsx";
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div>
      <div>
        <label
          htmlFor="pdfTitle"
          className="block text-sm sm:text-lg font-medium mb-2 sm:mb-4"
        >
          Título do PDF:
        </label>
        <input
          type="text"
          id="pdfTitle"
          value={pdfTitle}
          onChange={(e) => setPdfTitle(e.target.value)}
          placeholder="Digite o título do documento"
          className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>
      <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-between">
        <button
          className="w-full sm:w-auto bg-[#12164D] hover:bg-blue-700 text-white font-semibold py-3 px-6 sm:px-8 text-sm sm:text-base rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          onClick={generatePDF}
        >
          Gerar PDF
        </button>
        <button
          className="w-full sm:w-auto bg-[#12164D] hover:bg-blue-700 text-white font-semibold py-3 px-6 sm:px-8 text-sm sm:text-base rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          onClick={generateXLSX}
        >
          Gerar XLSX
        </button>
      </div>
    </div>
  );
};

export default GenerateDOC;