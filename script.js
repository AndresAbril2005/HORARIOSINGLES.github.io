const form = document.getElementById("formHorario");
const btnPDF = document.getElementById("btnPDF");

// Guardar clases en la tabla
form.addEventListener("submit", e => {
    e.preventDefault();

    const dia = document.getElementById("dia").value;
    const inicio = document.getElementById("horaInicio").value;
    const fin = document.getElementById("horaFin").value;
    const materia = document.getElementById("materia").value;
    const sede = document.getElementById("sede").value;
    const curso = document.getElementById("curso").value;
    const docente = document.getElementById("docente").value;

    let celda = document.getElementById(dia);
    celda.textContent += `Horario: ${inicio} - ${fin}\nSede - Aula: ${sede}\nAsignatura: ${materia}\nCurso: ${curso}\nDocente: ${docente}\n\n`;

    form.reset();
});

// Descargar PDF con formato exacto solicitado
btnPDF.addEventListener("click", () => {
    const dias = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
    let tablaFilas = "<tr>";
    dias.forEach(dia => {
        let contenido = document.getElementById(dia).textContent.replace(/\n/g, "<br>");
        tablaFilas += `<td>${contenido}</td>`;
    });
    tablaFilas += "</tr>";

    const contenidoPDF = `
    <div style="font-family: Arial; padding:15px;">
        <div style="display:flex; justify-content:space-between; border-bottom:2px solid #000; padding-bottom:8px;">
            <img src="img/logo.png" width="100" style="object-fit:contain;">
            <div style="text-align:center; font-weight:bold; font-size:18px; flex-grow:1;">
                KINGSTON ACADEMY<br>HORARIOS ESTUDIANTE
            </div>
            <div style="font-size:12px; text-align:right;">
                Código: 0<br>
                Versión: 1<br>
                Fecha versión: ${new Date().toLocaleDateString()}<br>
                Página: 1 de 1
            </div>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:13px; margin-top:5px; margin-bottom:5px;">
            <div><b>Estudiante:</b> Andres Felipe Abril Lopez</div>
            <div><b>Desde:</b> 28/07/2025 - <b>Hasta:</b> 03/08/2025</div>
        </div>
        <table border="1" style="width:100%; border-collapse:collapse; font-size:11px;">
            <thead>
                <tr>
                    <th>Lunes</th>
                    <th>Martes</th>
                    <th>Miércoles</th>
                    <th>Jueves</th>
                    <th>Viernes</th>
                    <th>Sábado</th>
                    <th>Domingo</th>
                </tr>
            </thead>
            <tbody>${tablaFilas}</tbody>
        </table>
    </div>`;

    let pdfArea = document.createElement("div");
    pdfArea.innerHTML = contenidoPDF;
    document.body.appendChild(pdfArea);

    try {
        html2pdf().from(pdfArea).set({
            margin: 0.3,
            filename: 'Horario_Kingston_Academy.pdf',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { scale: 2, letterRendering: true, useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
        }).save().then(() => {
            setTimeout(() => document.body.removeChild(pdfArea), 500);
        });
    } catch (err) {
        console.error("Error al generar PDF:", err);
        alert("Hubo un problema al generar el PDF. Verifique la ruta del logo.");
        document.body.removeChild(pdfArea);
    }
});


    html2pdf().from(pdfArea).set({
        margin: 0.3,
        filename: 'Horario_Kingston_Academy.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
    }).save().then(() => {
        document.body.removeChild(pdfArea);
    });
});
// === VARIABLES ===
const form = document.getElementById("formHorario");
const btnPDF = document.getElementById("btnPDF");
const btnBorrar = document.getElementById("btnBorrar");
const dias = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];

// === Cargar horario al iniciar ===
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("horario")) {
        const data = JSON.parse(localStorage.getItem("horario"));
        dias.forEach(dia => {
            document.getElementById(dia).textContent = data[dia] || "";
        });
    }
});

// === Guardar horario en LocalStorage ===
function guardarHorario() {
    let horario = {};
    dias.forEach(dia => {
        horario[dia] = document.getElementById(dia).textContent;
    });
    localStorage.setItem("horario", JSON.stringify(horario));
}

// === Agregar clase ===
form.addEventListener("submit", e => {
    e.preventDefault();

    const dia = document.getElementById("dia").value;
    const inicio = document.getElementById("horaInicio").value;
    const fin = document.getElementById("horaFin").value;
    const materia = document.getElementById("materia").value;
    const sede = document.getElementById("sede").value;
    const curso = document.getElementById("curso").value;
    const docente = document.getElementById("docente").value;

    let celda = document.getElementById(dia);
    celda.textContent += `Horario: ${inicio} - ${fin}\nSede - Aula: ${sede}\nAsignatura: ${materia}\nCurso: ${curso}\nDocente: ${docente}\n\n`;

    guardarHorario();
    form.reset();
});

// === Borrar horario completo ===
btnBorrar.addEventListener("click", () => {
    if (confirm("¿Seguro que deseas borrar todo el horario?")) {
        dias.forEach(dia => {
            document.getElementById(dia).textContent = "";
        });
        localStorage.removeItem("horario");
    }
});

// === Descargar PDF ===
btnPDF.addEventListener("click", () => {
    let tablaFilas = "<tr>";
    dias.forEach(dia => {
        // Convertir saltos de línea en <br>
        let contenido = document.getElementById(dia).textContent.replace(/\n/g, "<br>");
        tablaFilas += `<td>${contenido}</td>`;
    });
    tablaFilas += "</tr>";

    const contenidoPDF = `
    <div style="font-family: Arial; padding:15px;">
        <div style="text-align:center; font-weight:bold; font-size:18px; border-bottom:2px solid #000; padding-bottom:8px;">
            KINGSTON ACADEMY<br>HORARIOS ESTUDIANTE
        </div>
        <div style="display:flex; justify-content:space-between; font-size:13px; margin-top:5px; margin-bottom:5px;">
            <div><b>Estudiante:</b> Andres Felipe Abril Lopez</div>
            <div><b>Fecha de generación:</b> ${new Date().toLocaleDateString()}</div>
        </div>
        <table border="1" style="width:100%; border-collapse:collapse; font-size:11px; text-align:left;">
            <thead>
                <tr>
                    <th>Lunes</th>
                    <th>Martes</th>
                    <th>Miércoles</th>
                    <th>Jueves</th>
                    <th>Viernes</th>
                    <th>Sábado</th>
                    <th>Domingo</th>
                </tr>
            </thead>
            <tbody>${tablaFilas}</tbody>
        </table>
    </div>`;

    let pdfArea = document.createElement("div");
    pdfArea.innerHTML = contenidoPDF;
    document.body.appendChild(pdfArea);

    html2pdf()
        .from(pdfArea)
        .set({
            margin: 0.3,
            filename: 'Horario_Kingston_Academy.pdf',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { scale: 2, letterRendering: true, useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
        })
        .save()
        .then(() => {
            setTimeout(() => document.body.removeChild(pdfArea), 500);
        })
        .catch(err => console.error("Error al generar PDF:", err));
});
