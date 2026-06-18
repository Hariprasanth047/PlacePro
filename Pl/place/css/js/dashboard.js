const email = localStorage.getItem("userEmail");

if (!email) {

    alert("Please Login First");

    window.location.href = "login.html";
}

document.getElementById("welcomeUser").innerText =
"Welcome " + email + " 👋";
function logoutUser() {

    localStorage.removeItem("userEmail");

    window.location.href = "login.html";
}
// ================= DASHBOARD =================

// Check Login
const email = localStorage.getItem("userEmail");

if (document.getElementById("welcomeUser")) {

    if (!email) {

        alert("Please Login First");
        window.location.href = "login.html";
    }

    document.getElementById("welcomeUser").innerText =
        "Welcome " + email + " 👋";

    loadJobs();
}


// ================= LOAD JOBS =================

async function loadJobs() {

    try {

        const response = await fetch(
            "http://localhost:8080/api/jobs"
        );

        const jobs = await response.json();

        document.getElementById("totalJobs").innerText =
            jobs.length;

        let html = "";

        jobs.forEach(job => {

            html += `

            <div class="job-item">

                <div>
                    <h4>${job.companyName}</h4>

                    <p>${job.role}</p>

                    <span>${job.location}</span>
                </div>

                <button onclick="applyJob(${job.id})">
                    Apply
                </button>

            </div>

            `;
        });

        document.getElementById("jobList").innerHTML = html;

    }

    catch(error) {

        console.log(error);

        document.getElementById("jobList").innerHTML =
            "Unable to load jobs";
    }
}


// ================= APPLY JOB =================

function applyJob(id) {

    alert("Applied for Job ID : " + id);

}


// ================= LOGOUT =================

function logoutUser() {

    localStorage.removeItem("userEmail");

    window.location.href = "login.html";
}