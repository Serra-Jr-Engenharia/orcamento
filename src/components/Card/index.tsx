import React, {useState} from "react";
import GenerateDOC from "../GenerateDOC";
// import jsPDF from "jspdf";

export interface CardField {
    label: string;
    type: "select" | "radio" | "multiselect";
    options?: string[];
    key: string
    placeholder?: string;
    className?: string;
}

export interface Tab {
    name: string;
    fields: CardField[];
}

interface CardProps {
    tabs: Tab[];
    selections:  Record<string, any>;
    handleChange: (key: string, value: any) => void;
    totals: Record<string, number>;
    priceTable: Record<string, Record<string, number>>;
}

const Card: React.FC<CardProps>= ({tabs, selections, handleChange, totals, priceTable}) => {
    const [activeTab, setActiveTab] = useState<string>(tabs[0].name);
    const totalForCurrentTab = totals[activeTab] || 0;

    const renderField = (field: CardField) => {
        switch (field.type) {
            case "select":
                return (
                    <select className="bg-gray-100 rounded-xl h-14 px-4 font-semibold text-gray-500"
                    value={selections[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    >
                        {field.options?.map((opt, i) => (
                            <option key={i} value={opt}>{opt}</option>
                        ))}
                    </select>   
                );
            
            case "radio":
                return (
                    <div className="flex items-center gap-6">
                        {field.options?.map((opt, i) => (
                            <label key={i} className="flex items-center cursor-pointer group">  
                                <div className="relative">
                                    <input
                                        type="radio"
                                        name={field.key}
                                        checked={selections[field.key] === opt}
                                        onChange={() => handleChange(field.key, opt)}
                                        className="sr-only"
                                    />
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                        selections[field.key] === opt 
                                            ? 'border-blue-600 bg-blue-50' 
                                            : 'border-gray-300 bg-white hover:border-gray-400'
                                    }`}>
                                        {selections[field.key] === opt && (
                                            <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                                        )}
                                    </div>
                                </div>
                                <span className={`ml-3 text-sm transition-colors ${
                                    selections[field.key] === opt 
                                        ? 'text-blue-600 font-medium' 
                                        : 'text-gray-600'
                                }`}>
                                    {opt}
                                </span>
                            </label>    
                        ))}
                    </div>
                );

            case "multiselect":
                return (
                    <div className="flex flex-wrap gap-2">
                        {field.options?.map((opt, i) => (
                            <label
                                key={i}
                                className="w-full flex items-center p-3 rounded-lg gap-3 cursor-pointer transition-colors hover:border-blue-500 hover:bg-blue-50"
                            >
                               
                                <input
                                    type="checkbox"
                                    checked={selections[field.key]?.includes(opt)}
                                    onChange={() => {
                                        const current = selections[field.key] || [];
                                            if (current.includes(opt)) {
                                                handleChange(field.key, current.filter((v: string) => v !== opt));
                                            } else {
                                                handleChange(field.key, [...current, opt]);
                                            }
                                    }}
                                    className="sr-only" 
                                />

                                <div className={`w-5 h-5 border-2 rounded flex-shrink-0 flex items-center justify-center ${
                                    selections[field.key]?.includes(opt)
                                        ? 'bg-blue-600 border-blue-600' 
                                        : 'bg-white border-gray-400'   
                                }`}>
                                    {selections[field.key]?.includes(opt) && (
                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>

                                <span>{opt}</span>
                            </label>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    };
    
    const activeFields = tabs.find((tab) => tab.name === activeTab)?.fields || [];

    return(
    <div className="bg-white w-3/4 rounded-2xl shadow-md -mt-16 mb-20 flex flex-col items-center relative z-20">
            {/*Abas*/}
            <div className="flex w-full">
                {tabs.map((tab) => (
                    <button 
                        key={tab.name}
                        onClick={() => {
                            setActiveTab(tab.name);
                        }}
                        className={`flex-1 py-3 font-bold text-lg rounded-t-2xl ${
                            activeTab === tab.name
                                ? "bg-white text-blue-900 shadow-inner"
                                : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-blue-700"
                            }`}
                    >
                        {tab.name}
                    </button>
                    ))}               
            </div>
                
            {/*Campos*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-12">
                    {activeFields.map((field) => (
                        <div key={field.key} className="flex flex-col">
                            <label className={`text-lg font-medium text-gray-700 mb-2 ${field.className || ''}`}>
                                {field.label}
                            </label>
                            {renderField(field)}
                        </div>
                    ))}
            </div>
        <div className="flex items-center w-full justify-between mt-12 mb-8 px-12">
            {/*Total*/}
            <div className="flex-1">
                <p className="font-bold text-[#12164D]" style={{
                    fontSize: '70px',
                    }}>
                    R${totalForCurrentTab.toFixed(0)}
                </p>
            </div>
            {/*Botão de gerar PDF*/}
            <div className="flex justify-center gap-4">
                < GenerateDOC selections={selections} totals={totals[activeTab]} tabs={tabs} priceTable={priceTable}/>
            </div>
        </div>    
    </div>
);
}

export default Card;