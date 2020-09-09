import jsPDF from "jspdf";
import "jspdf-autotable";
const exportToPDF = (title, fields = [], data = [], fileName) => {
  const doc = new jsPDF();
  const header = fields.map((item) => item.label);
  let body = data.map((item) => {
    let row = [];
    for (const property in item) {
      row.push(item[property]);
    }
    return row;
  });

  doc.text(title, 14, 20);

  doc.autoTable({
    head: [header],
    body: body,
    startY: 35,
    rowPageBreak: "auto",
    bodyStyles: { valign: "top" },
  });
  doc.save(`${fileName}.pdf`);
};
export { exportToPDF };
