const translations = {
    en: {
      school_name: "MN MURUNKAN C.C",
      checker_title: "🎓 Result Checker",
      roll_placeholder: "Enter Roll Number",
      check_btn: "Check Result",
      name: "Name",
      total: "Total",
      average: "Average",
      status: "Status",
      not_found: "Roll number not found.",
      enter_roll: "Please enter a roll number.",
      "tamil": "Tamil",
      "maths": "Maths",
      "science": "Science",
      "english": "English",
      "history": "History",
      "R.C": "Religious and Cultural Studies",
      "N.R.C": "Non-Religious and Cultural Studies",
      "hindu": "Hinduism",
      "civics": "Civics",
      "P.T.S": "Physical Training and Sports",
      "geography": "Geography",
      "sinhala": "Sinhala",
      "musics": "Music",
      "art": "Art",
      "drama": "Drama",
      "dance": "Dance",
      "phy.edu": "Physical Education",
      "ict": "Information and Communication Technology"
    },
    ta: {
      school_name: "MN MURUNKAN C.C",
      checker_title: "🎓 பெறுபேறு சோதனை",
      roll_placeholder: "ரொல் எண் உள்ளிடுக",
      check_btn: "பெறுபேறு காண்க",
      name: "பெயர்",
      total: "மொத்தம்",
      average: "சராசரி",
      status: "நிலை",
      not_found: "ரொல் எண் கிடைக்கவில்லை.",
      enter_roll: "தயவுசெய்து ரொல் எண் உள்ளிடவும்.",
      "tamil": "தமிழ்",
      "maths": "கணிதம்",
      "science": "அறிவியல்",
      "english": "ஆங்கிலம்",
      "history": "வரலாறு",
      "R.C": "இராஜ்யக் கற்று",
      "N.R.C": "தேசிய இராஜ்யக் கற்று",
      "hindu": "ஹிந்து மதம்",
      "civics": "சனநாயகம்",
      "P.T.S": "நடைபயிற்சி மற்றும் விளையாட்டு",
      "geography": "புவியியல்",
      "sinhala": "சிங்களம்",
      "musics": "இசை",
      "art": "கலை",
      "drama": "நாடகம்",
      "dance": "நடனம்",
      "phy.edu": "உடற்பயிற்சி கல்வி",
      "ict": "தகவல் தொடர்பாடல் தொழில்நுட்பம்"
    }
  };

  let currentLang = 'en';

  function changeLanguage() {
    currentLang = document.getElementById('langSwitcher').value;
    document.querySelectorAll('[data-key]').forEach(el => {
      const key = el.getAttribute('data-key');
      if (el.tagName === "INPUT") {
        el.placeholder = translations[currentLang][key];
      } else {
        el.textContent = translations[currentLang][key];
      }
    });
  }

  const data = {
    "16250": {
      "name": "J.JACKSON",
      "tamil": 56,
      "maths": 69,
      "science": 53,
      "english": 78,
      "history": 49,
      "R.C": 22,
      "sinhala": 72,
      "musics": 80,
      "art": 67
      
    }
  }

  function checkResult() {
    const roll = document.getElementById("roll").value.trim();
    const resultDiv = document.getElementById("result");
    resultDiv.classList.remove("show");
    resultDiv.innerHTML = "";

    if (!roll) {
      resultDiv.innerHTML = `<p class="not-found">❗ ${translations[currentLang].enter_roll}</p>`;
      resultDiv.classList.add("show");
      return;
    }

    const student = data[roll];
    if (student) {
      const total = Object.keys(student)
        .filter(key => key !== "name")
        .reduce((sum, key) => sum + student[key], 0);
      const avg = (total / (Object.keys(student).length - 1)).toFixed(2);
      const status = avg >= 35 ? 'Pass' : 'Fail';
      const statusClass = status.toLowerCase();

      const subjects = [
        "tamil", "maths", "science", "english", "history",
        "R.C", "N.R.C", "hindu", "civics", "P.T.S",
        "geography", "sinhala", "musics", "art", "drama",
        "dance", "phy.edu", "ict"
      ];

      const subjectsHTML = subjects
        .filter(sub => student[sub] !== undefined && student[sub] !== null)
        .map(sub => `
          <div class="subject">
            <div class="subject-label">
              <span>${translations[currentLang][sub]}:</span>
              <span>${student[sub]}</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${student[sub]}%;"></div>
            </div>
          </div>
        `).join('');

      resultDiv.innerHTML = `
        <h3>👤 ${translations[currentLang].name}: ${student.name}</h3>
        ${subjectsHTML}
        <p>🔢 ${translations[currentLang].total}: <strong>${total}</strong></p>
        <p>📊 ${translations[currentLang].average}: <strong>${avg}</strong></p>
        <p class="status ${statusClass}">${translations[currentLang].status}: ${status}</p>
      `;
    } else {
      resultDiv.innerHTML = `<p class="not-found">❌ ${translations[currentLang].not_found}</p>`;
    }

    setTimeout(() => resultDiv.classList.add("show"), 10);
  }