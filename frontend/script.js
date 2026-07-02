async function loadStudents() {
  const response = await fetch("/api/students");
  const students = await response.json();
  const tbody = document.querySelector("#studentsTable tbody");
  tbody.innerHTML = "";
  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${student.id}</td><td>${student.name}</td>`;
    tbody.appendChild(row);
  });
}

document.getElementById("loadButton").addEventListener("click", loadStudents);

document.getElementById("addStudentButton").addEventListener("click", async () => {
  const input = document.getElementById("newStudentName");
  const name = input.value && input.value.trim();
  if (!name) return alert("Por favor ingresa un nombre");

  try {
    const res = await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => null);
      return alert(err && err.error ? err.error : "Error al crear estudiante");
    }
    const created = await res.json();
    input.value = "";
    loadStudents();
    alert(`Estudiante creado: ${created.name} (id: ${created.id})`);
  } catch (e) {
    console.error(e);
    alert("Error de red al crear estudiante");
  }
});
document.getElementById('saludarButton').addEventListener('click', () => {
  const nombre = document.getElementById('nombreInput').value.trim();
  if (!nombre) {
    return alert("Por favor ingresa un nombre");
  }
  fetch(`/api/greet?name=${encodeURIComponent(nombre)}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('saludoTexto').textContent = data.message;
    });
});
// Optionally load students on page load
// loadStudents();
