import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import React, {useState} from "react";
import type { Tab } from "../Card/index.tsx";

interface GenerateDOCProps {
  selections: Record<string, any>;
  totals: number;
  tabs: Tab[]
  priceTable: Record<string, Record<string, number>>;
}

const GenerateDOC: React.FC<GenerateDOCProps> = ({ selections, totals, tabs, priceTable }) => {
  const [pdfTitle, setPdfTitle] = useState("");

  const generatePDF = () => {
    const doc = new jsPDF();
  
    doc.setFont("Poppins", "normal");
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
    const rowHeight = 10;

    doc.setFontSize(12);
    doc.setFont("Poppins", "bold");
    doc.text("Campo", marginLeft, currentY);
    doc.text("Valor", 80, currentY);
    doc.text("Preço", 150, currentY);

    doc.setFontSize(12);
    doc.setFont("Poppins", "normal");
    currentY += rowHeight;

    tabs.forEach((tab) => {
      tab.fields.forEach((field) => {
        const value = selections[field.key];
        if (value === null || value === undefined || (typeof value === 'boolean' && !value)) {
            return; 
        }

        let formattedValue;
        if (typeof value === 'boolean') {
          formattedValue = value ? "Sim" : "Não";
        } else {
          formattedValue = value.toString();
        }

        const itemPrice = priceTable[field.key]?.[value]; 
        const priceText = itemPrice ? `R$${itemPrice}` : "Não Disponível";

        doc.text(field.label, marginLeft, currentY);
        doc.text(formattedValue, 80, currentY);
        doc.text(priceText, 150, currentY);

        currentY += rowHeight;
      });
    });
    
    doc.setFont("Poppins", "bold");
    doc.text("Total", marginLeft, currentY);
    doc.text(`R$${totals}`, 150, currentY);
    currentY += rowHeight;

    doc.setDrawColor(0, 0, 0);
    doc.line(14, currentY, 196, currentY);

    const fileName = pdfTitle.trim() ? `${pdfTitle}.pdf` : "ResumoPedido.pdf";
    doc.save(fileName);
  };

  const generateXLSX = () => {
    const data = [
      ["Campo", "Tipo", "Valor", "Preço"]
    ];

    tabs.forEach((tab) => {
      tab.fields.forEach((field) => {
        const value = selections[field.key];

        if (value === null || value === undefined || (typeof value === 'boolean' && !value)) {
            return; 
        }

        let formattedValue;
        if (typeof value === 'boolean') {
          formattedValue = value ? "Sim" : "Não";
        } else {
          formattedValue = value.toString();
        }
        
        const itemPrice = priceTable[field.key]?.[value];
        const priceText = itemPrice ? `R$${itemPrice}` : "Não Disponível";

        data.push([
            field.label,      
            field.type,       
            formattedValue,   
            priceText         
        ]);
      });      
    });

    data.push(["Total", "", "", `R$${totals}`]); 

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
