
// VALIDATION
const form = document.getElementById("admissionForm");

form.addEventListener("submit", function (e) {
  if (!form.checkValidity()) {
    e.preventDefault();
    e.stopPropagation();
  }
  form.classList.add("was-validated");
});

// COUNTRY CODES (FULL LIST SIMPLIFIED SAMPLE)
const countryCodes = [
  { code: "+256", name: "Uganda" },
  { code: "+1", name: "USA" },
  { code: "+44", name: "UK" },
  { code: "+91", name: "India" },
  { code: "+254", name: "Kenya" }
];

const select = document.getElementById("countryCode");

countryCodes.forEach(c => {
  let option = document.createElement("option");
  option.value = c.code;
  option.textContent = `${c.name} (${c.code})`;
  select.appendChild(option);
});

const programSelect = document.getElementById("programSelect");

fetch("/programs-data")
  .then(response => response.json())
  .then(programs => {
    programs.forEach(program => {
      let option = document.createElement("option");
      option.value = program.name;
      option.textContent = program.name;
      programSelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error("Error loading programs:", error);
  });
