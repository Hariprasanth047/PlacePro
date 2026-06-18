// ================= REGISTER USER =================

async function registerUser(event) {

    event.preventDefault();

    const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        college: document.getElementById("college").value
    };

    try {

        const response = await fetch(
            "http://localhost:8080/api/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }
        );
if (!response.ok) {
    throw new Error("Registration Failed");
}

const data = await response.text();

console.log(data);

alert("Registration Successful");

window.location.href = "login.html";

    } catch (error) {

        console.error(error);

        alert("Registration Failed");
    }
}
// ================= LOGIN USER =================

async function loginUser(event) {

    event.preventDefault();

    const user = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    try {

        const response = await fetch(
            "http://localhost:8080/api/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }
        );

        const data = await response.text();

        console.log(data);

        if(data === "Login Successful") {

            alert("Login Successful");

            localStorage.setItem(
                "userEmail",
                user.email
            );

            window.location.href =
                "dashboard.html";

        }
        else {

            alert("Invalid Email or Password");
        }

    }
    catch(error) {

        console.error(error);

        alert("Login Failed");
    }
}
// ================= DASHBOARD =================
window.onload = function () {

    let email =
    localStorage.getItem("userEmail");

    if(email){

        let welcomeUser =
        document.getElementById("welcomeUser");

        if(welcomeUser){
            welcomeUser.innerText =
            "Welcome " + email + " 👋";
        }
    }

    loadJobCount();
    updateAppliedCount();
    if(document.getElementById("appliedJobList")){
        loadAppliedJobs();
    }
}

// Total Jobs
async function loadJobCount() {

    try {

        const response =
            await fetch(
                "http://localhost:8080/api/jobs"
            );

        const jobs =
            await response.json();

        let totalJobs =
            document.getElementById("totalJobs");

        if(totalJobs){
            totalJobs.innerText =
            jobs.length;
        }

    }
    catch(error){

        console.error(error);
    }
}

// Logout
function logout() {

    localStorage.removeItem(
        "userEmail"
    );

    window.location.href =
        "login.html";
}
// ================= LOAD JOBS =================

async function loadJobs() {

    try {

        const response =
            await fetch(
                "http://localhost:8080/api/jobs"
            );

        const jobs =
            await response.json();

        let output = "";

        jobs.forEach(job => {

            output += `
                <div>
                    <h3>${job.companyName}</h3>
                    <p>${job.role}</p>
                    <p>${job.location}</p>
                    <p>${job.salary}</p>

                    <button
class="apply-btn"
onclick=""openApplicationForm(${job.id})"">
Apply
</button>

                    <hr>
                </div>
            `;
        });

        document.getElementById(
            "jobList"
        ).innerHTML = output;

    }
    catch(error){

        console.error(error);
    }
}

if(document.getElementById("jobList")){
    loadJobs();
}
async function applyJob(jobId){

    try{

        const applications = await fetch(
            "http://localhost:8080/api/applications"
        );

        const appliedJobs =
            await applications.json();

        const alreadyApplied =
            appliedJobs.some(
                app => app.jobId === jobId
            );

        if(alreadyApplied){

            alert("Already Applied");
            return;
        }

        const application = {

            userId: 1,
            jobId: jobId,
            status: "Applied"
        };

        const response = await fetch(
            "http://localhost:8080/api/applications",
            {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(application)
            }
        );

        if(response.ok){

            alert("Application Submitted");

            loadAppliedJobs();
        }

    }catch(error){

        console.error(error);
    }
}
// ================= JOBS PAGE =================

async function loadAllJobs() {

    try {

        const response =
            await fetch("http://localhost:8080/api/jobs");

        const jobs =
            await response.json();

        let html = "";

        jobs.forEach(job => {

            html += `
            <div class="job-card">

                <h2>${job.companyName}</h2>

                <p><strong>Role:</strong> ${job.role}</p>

                <p><strong>Location:</strong> ${job.location}</p>

                <p><strong>Salary:</strong> ₹${job.salary}</p>

                <button
<button
class="apply-btn"
onclick="openApplicationForm(${job.id})">
Apply
</button>


<button
class="save-btn"
onclick="saveJob(${job.id})">
Save
</button>

            </div>
            `;
        });

        document.getElementById("jobList").innerHTML =
            html;

    }
    catch(error){

        console.error(error);
    }
}
function searchJobs() {

    let input =
        document.getElementById("jobSearch")
        .value
        .toLowerCase();

    let cards =
        document.querySelectorAll(".job-card");

    cards.forEach(card => {

        if(card.innerText
            .toLowerCase()
            .includes(input)) {

            card.style.display = "block";
        }
        else {

            card.style.display = "none";
        }
    });
}
if(document.getElementById("jobList")){

    loadAllJobs();
}
async function loadAppliedJobs() {

    let appliedJobs =
        JSON.parse(
            localStorage.getItem("appliedJobs")
        ) || [];

    try {

        const response =
            await fetch(
                "http://localhost:8080/api/jobs"
            );

        const jobs =
            await response.json();

        let html = "";

        jobs.forEach(job => {

            if(appliedJobs.includes(job.id)) {

                html += `
                <div class="job-card">

                    <h2>${job.companyName}</h2>

                    <p>${job.role}</p>

                    <p>${job.location}</p>

                    <p>₹${job.salary}</p>

                </div>
                `;
            }
        });

        let container =
            document.getElementById(
                "appliedJobList"
            );

        if(container){
            container.innerHTML = html;
        }

    } catch(error){

        console.error(error);
    }
}
if(document.getElementById("appliedJobList")){

    loadAppliedJobs();
}
// ================= PROFILE =================

function loadProfile(){

    let email =
    localStorage.getItem("userEmail");

    if(email){

        let profileEmail =
        document.getElementById(
            "profileEmail"
        );

        if(profileEmail){

            profileEmail.innerText =
            email;
        }

        let profileName =
        document.getElementById(
            "profileName"
        );

        if(profileName){

            profileName.innerText =
            email.split("@")[0];
        }
    }
}

loadProfile();
// ================= RESUME BUILDER =================

function generateResume(){

    let name =
    document.getElementById("name").value;

    let email =
    document.getElementById("email").value;

    let skills =
    document.getElementById("skills").value;

    let education =
    document.getElementById("education").value;

    let projects =
    document.getElementById("projects").value;

    let certifications =
    document.getElementById("certifications").value;

    document.getElementById(
        "resumeOutput"
    ).innerHTML = `

        <h2>${name}</h2>

        <p><b>Email:</b> ${email}</p>

        <h3>Skills</h3>
        <p>${skills}</p>

        <h3>Education</h3>
        <p>${education}</p>

        <h3>Projects</h3>
        <p>${projects}</p>

        <h3>Certifications</h3>
        <p>${certifications}</p>

    `;
}
function searchQuestion() {
    let input =
    document.getElementById("search")
    .value.toLowerCase();

    let cards =
    document.querySelectorAll(".question-card");

    cards.forEach(card => {

        if(card.innerText
        .toLowerCase()
        .includes(input)) {

            card.style.display = "block";
        }
        else {

            card.style.display = "none";
        }
    });
}
async function applyJob(jobId){

    const application = {

        userId: 1,
        jobId: jobId
    };

    try{

        const response = await fetch(
            "http://localhost:8080/api/applications",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(application)
            }
        );

        const data = await response.json();

        alert("Application Submitted");

        updateAppliedCount();

    }catch(error){

        console.error(error);

        alert("Application Failed");
    }
}

async function updateAppliedCount(){

    try{

        const response =
        await fetch(
            "http://localhost:8080/api/applications/count"
        );

        const count =
        await response.json();

        const appliedJobs =
        document.getElementById("appliedJobs");

        if(appliedJobs){
            appliedJobs.innerText = count;
        }

    }catch(error){

        console.error(error);
    }
}
async function searchJobs() {

    let company =
        document.getElementById("jobSearch")
        .value;

    try {

        let url =
        "http://localhost:8080/api/jobs";

        if(company.trim() !== ""){

            url =
            "http://localhost:8080/api/jobs/company/"
            + company;
        }

        const response =
            await fetch(url);

        const jobs =
            await response.json();

        let html = "";

        jobs.forEach(job => {

            html += `
            <div class="job-item">

                <div class="job-info">
                    <h4>${job.companyName}</h4>
                    <p>${job.role}</p>
                    <span>${job.location}</span>
                    <p>₹${job.salary}</p>
                </div>

                <button
class="apply-btn"
onclick="openApplicationForm(${job.id})">
Apply
</button>

            </div>
            `;
        });

        document.getElementById("jobList")
        .innerHTML = html;

    } catch(error) {

        console.error(error);
    }
}
async function loadProfile(){

    let email =
    localStorage.getItem("userEmail");

    if(!email) return;

    try{

        const response =
        await fetch(
        "http://localhost:8080/api/users/email/" + email
        );

        const user =
        await response.json();

        document.getElementById("profileName")
        .innerText = user.name;

        document.getElementById("profileEmail")
        .innerText = user.email;

        document.getElementById("profileCollege")
        .innerText = user.college;

    }catch(error){

        console.error(error);
    }
}
if(document.getElementById("profileName")){
    loadProfile();
}
async function updateProfile(){

    let email =
    localStorage.getItem("userEmail");

    const response =
    await fetch(
    "http://localhost:8080/api/users/email/" + email
    );

    const user =
    await response.json();

    user.name =
    prompt("Enter New Name", user.name);

    user.college =
    prompt("Enter New College", user.college);

    await fetch(
    "http://localhost:8080/api/users/profile/" +
    user.id,
    {
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    });

    alert("Profile Updated");

    loadProfile();
}
async function saveJob(jobId){

    const savedJob = {

        userId: 1,
        jobId: jobId
    };

    try{

        const response =
        await fetch(
        "http://localhost:8080/api/saved-jobs",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(savedJob)
        });

        const data =
        await response.json();

        alert("Job Saved");

    }catch(error){

        console.error(error);

        alert("Save Failed");
    }
}
async function loadSavedJobs(){

    try{

        const response =
        await fetch(
        "http://localhost:8080/api/saved-jobs"
        );

        const jobs =
        await response.json();

        let html = "";

        jobs.forEach(job => {

            html += `
            <div class="job-item">

                <p>Job ID :
                ${job.jobId}</p>

                <button
                onclick="deleteSavedJob(${job.id})">
                Remove
                </button>

            </div>
            `;
        });

        document.getElementById(
        "savedJobsList"
        ).innerHTML = html;

    }catch(error){

        console.error(error);
    }
}
async function deleteSavedJob(id){

    await fetch(
    "http://localhost:8080/api/saved-jobs/" + id,
    {
        method:"DELETE"
    });

    loadSavedJobs();
}
async function loadProfile() {

    const email =
        localStorage.getItem("userEmail");

    if(!email){
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:8080/api/users/email/" + email
        );

        const user = await response.json();

        let profileName =
            document.getElementById("profileName");

        let profileEmail =
            document.getElementById("profileEmail");

        let profileCollege =
            document.getElementById("profileCollege");

        if(profileName){
            profileName.innerText =
            user.name || "User";
        }

        if(profileEmail){
            profileEmail.innerText =
            user.email || "";
        }

        if(profileCollege){
            profileCollege.innerText =
            user.college || "";
        }

    }
    catch(error){

        console.error(error);
    }
}
async function loadAdminDashboard() {

    try {

        // Users
        let usersResponse =
            await fetch("http://localhost:8080/api/users");

        let users =
            await usersResponse.json();

        // Jobs
        let jobsResponse =
            await fetch("http://localhost:8080/api/jobs");

        let jobs =
            await jobsResponse.json();

        // Applications
        let appResponse =
            await fetch("http://localhost:8080/api/applications");

        let applications =
            await appResponse.json();
            let approvedCount =
    applications.filter(
        app => app.status === "Approved"
    ).length;

let rejectedCount =
    applications.filter(
        app => app.status === "Rejected"
    ).length;

        if(document.getElementById("adminUsers")){
            document.getElementById("adminUsers").innerText =
                users.length;
        }

        if(document.getElementById("adminJobs")){
            document.getElementById("adminJobs").innerText =
                jobs.length;
        }

        if(document.getElementById("adminApplications")){
            document.getElementById("adminApplications").innerText =
                applications.length;
        }
        if(document.getElementById("approvedApplications")){
    document.getElementById("approvedApplications").innerText =
        approvedCount;
}

if(document.getElementById("rejectedApplications")){
    document.getElementById("rejectedApplications").innerText =
        rejectedCount;
}

    }
    catch(error){
        console.error(error);
    }
}

if(document.getElementById("adminUsers")){
    loadAdminDashboard();
}
async function addJobAdmin() {

    const job = {

        companyName:
            document.getElementById("companyName").value,

        role:
            document.getElementById("role").value,

        salary:
            document.getElementById("salary").value,

        location:
            document.getElementById("location").value
    };

    try {

        await fetch(
            "http://localhost:8080/api/jobs",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(job)
            }
        );

        alert("Job Added");

        loadAdminJobs();

    } catch(error) {

        console.error(error);
    }
}

async function loadAdminJobs() {

    try {

        const response =
            await fetch("http://localhost:8080/api/jobs");

        const jobs =
            await response.json();

        let html = "";

        jobs.forEach(job => {

            html += `
                <div class="job-item">

                    <h3>${job.companyName}</h3>

                    <p>${job.role}</p>

                    <button
                    onclick="deleteJobAdmin(${job.id})">
                    Delete
                    </button>

                </div>
            `;
        });

        let adminJobList =
            document.getElementById("adminJobList");

        if(adminJobList){
            adminJobList.innerHTML = html;
        }

    } catch(error){

        console.error(error);
    }
}

async function deleteJobAdmin(id){

    await fetch(
        "http://localhost:8080/api/jobs/" + id,
        {
            method:"DELETE"
        }
    );

    loadAdminJobs();
}

if(document.getElementById("adminJobList")){
    loadAdminJobs();
}
// ================= ADMIN USERS =================

async function loadUsers() {

    try {

        const response =
            await fetch(
                "http://localhost:8080/api/users"
            );

        const users =
            await response.json();

        let html = "";

        users.forEach(user => {

            html += `
                <div class="job-item">

                    <h3>${user.name}</h3>

                    <p>${user.email}</p>

                    <p>${user.college}</p>

                    <button
                    onclick="deleteUser(${user.id})">
                    Delete
                    </button>

                </div>
            `;
        });

        let userList =
            document.getElementById("userList");

        if(userList){
            userList.innerHTML = html;
        }

    } catch(error){

        console.error(error);
    }
}

async function deleteUser(id){

    try {

        await fetch(
            "http://localhost:8080/api/users/" + id,
            {
                method: "DELETE"
            }
        );

        loadUsers();

    } catch(error){

        console.error(error);
    }
}

if(document.getElementById("userList")){
    loadUsers();
}
// ================= ADMIN APPLICATIONS =================

async function loadApplications() {

    try {

        const response =
            await fetch(
                "http://localhost:8080/api/applications"
            );

        const applications =
            await response.json();

        let html = "";

        applications.forEach(app => {

            html += `
    <div class="job-item">

        <h3>Application ID: ${app.id}</h3>

        <p><b>Name:</b> ${app.name}</p>

        <p><b>Email:</b> ${app.email}</p>

        <p><b>Phone:</b> ${app.phone}</p>

        <p><b>CGPA:</b> ${app.cgpa}</p>

        <p><b>Skills:</b> ${app.skills}</p>

        <p><b>Certificates:</b> ${app.certificates}</p>

        <p><b>About:</b> ${app.about}</p>

        <p><b>Job ID:</b> ${app.jobId}</p>

        <p><b>Status:</b> ${app.status}</p>

        <button
        onclick="updateApplicationStatus(${app.id},'Approved')">
        Approve
        </button>

        <button
        onclick="updateApplicationStatus(${app.id},'Rejected')">
        Reject
        </button>

    </div>
`;
        });

        let applicationList =
            document.getElementById("applicationList");

        if(applicationList){
            applicationList.innerHTML = html;
        }

    } catch(error){

        console.error(error);
    }
}

async function updateApplicationStatus(id,status){

    try {

        await fetch(
            `http://localhost:8080/api/applications/${id}/status?status=${status}`,
            {
                method:"PUT"
            }
        );

        loadApplications();

    } catch(error){

        console.error(error);
    }
}

if(document.getElementById("applicationList")){
    loadApplications();
}
function downloadResume() {

    const element = document.getElementById("resumeOutput");

    html2pdf(element);
}
async function loadSQLQuestions() {

    try {

        const response = await fetch(
            "http://localhost:8080/api/sql"
        );

        const questions =
            await response.json();

        let html = "";

        questions.forEach(question => {

            html += `
                <div class="question-card">

                    <h3>${question.title}</h3>

                    <p>${question.question}</p>

                    <button
                    onclick="showSolution('${question.solution}')">
                    View Solution
                    </button>

                </div>
            `;
        });

        const container =
            document.getElementById("sqlQuestionList");

        if(container){
            container.innerHTML = html;
        }

    } catch(error){

        console.error(error);
    }
}
function showSolution(solution){

    alert(solution);
}
if(document.getElementById("sqlQuestionList")){
    loadSQLQuestions();
}
async function loadDSATopics() {

    try {

        const response = await fetch(
            "http://localhost:8080/api/dsa"
        );

        const topics =
            await response.json();

        let html = "";

        topics.forEach(topic => {

            html += `
                <div class="topic-card">

                    <h2>${topic.topicName}</h2>

                    <p>
                        ${topic.problemCount}
                        Problems
                    </p>

                    <button
                    onclick="viewProblems('${topic.topicName}')">
                        View Problems
                    </button>

                </div>
            `;
        });

        const container =
            document.getElementById("dsaTopicList");

        if(container){
            container.innerHTML = html;
        }

    } catch(error){

        console.error(error);
    }
}
function viewProblems(topic){

    alert(topic + " Problems Coming Soon");
}
if(document.getElementById("dsaTopicList")){
    loadDSATopics();
}
let mockQuestions = [];

let currentQuestion = 0;

let score = 0;
async function loadMockQuestions() {

    try {

        const response = await fetch(
            "http://localhost:8080/api/mock"
        );

        mockQuestions =
            await response.json();

        showQuestion();

    } catch(error){

        console.error(error);
    }
}
function showQuestion() {

    if(mockQuestions.length === 0){
        return;
    }

    const q =
        mockQuestions[currentQuestion];

    document.getElementById("question")
        .innerText = q.question;

    document.getElementById("optionA")
        .innerText = q.optionA;

    document.getElementById("optionB")
        .innerText = q.optionB;

    document.getElementById("optionC")
        .innerText = q.optionC;

    document.getElementById("optionD")
        .innerText = q.optionD;

    document.getElementById("optionA")
        .onclick = () => checkAnswer("A");

    document.getElementById("optionB")
        .onclick = () => checkAnswer("B");

    document.getElementById("optionC")
        .onclick = () => checkAnswer("C");

    document.getElementById("optionD")
        .onclick = () => checkAnswer("D");
}
function checkAnswer(answer) {

    const q =
        mockQuestions[currentQuestion];

    if(answer === q.correctAnswer){

        score++;

        alert("Correct Answer");
    }
    else{

        alert("Wrong Answer");
    }
}
function nextQuestion() {

    currentQuestion++;

    if(currentQuestion < mockQuestions.length){

        showQuestion();
    }
    else{

        document.getElementById("question")
            .innerText =
            "Test Completed";

        document.querySelector(".options")
            .innerHTML = "";

        document.getElementById("score")
            .innerText =
            "Score : " +
            score +
            "/" +
            mockQuestions.length;
    }
}
if(document.getElementById("question")){
    loadMockQuestions();
}
async function loadDashboardStats() {

    try {

        const jobs =
            await (await fetch("http://localhost:8080/api/jobs")).json();

        const applications =
            await (await fetch("http://localhost:8080/api/applications")).json();

        const savedJobs =
            await (await fetch("http://localhost:8080/api/saved-jobs")).json();

        const sqlQuestions =
            await (await fetch("http://localhost:8080/api/sql")).json();

        const dsaTopics =
            await (await fetch("http://localhost:8080/api/dsa")).json();

        const mockQuestions =
            await (await fetch("http://localhost:8080/api/mock")).json();

        document.getElementById("totalJobs").innerText =
            jobs.length;

        document.getElementById("appliedJobs").innerText =
    applications.length;

        // document.getElementById("totalSavedJobs").innerText =
        //     savedJobs.length;

        document.getElementById("sqlCount").innerText =
    sqlQuestions.length;

        document.getElementById("dsaCount").innerText =
    dsaTopics.length;

        // document.getElementById("totalMock").innerText =
        //     mockQuestions.length;

    }
    catch(error){

        console.error(error);
    }
}
if(document.getElementById("totalJobs")){
    loadDashboardStats();
}
function adminLogin(){

    const email =
        document.getElementById("adminEmail").value;

    const password =
        document.getElementById("adminPassword").value;

    if(
        email === "admin@placepro.com" &&
        password === "admin123"
    ){

        localStorage.setItem(
            "adminLoggedIn",
            "true"
        );

        window.location.href =
            "admin.html";
    }
    else{

        alert("Invalid Admin Credentials");
    }
}
function checkAdminAccess(){

    const adminLoggedIn =
        localStorage.getItem(
            "adminLoggedIn"
        );

    if(adminLoggedIn !== "true"){

        window.location.href =
            "admin-login.html";
    }
}
if(
    window.location.pathname.includes("admin.html") ||
    window.location.pathname.includes("manage-users.html") ||
    window.location.pathname.includes("manage-jobs.html") ||
    window.location.pathname.includes("manage-applications.html")
){
    checkAdminAccess();
}
function adminLogout(){

    localStorage.removeItem("adminLoggedIn");

    window.location.href = "admin-login.html";
}
async function submitApplication(){

    const application = {

        userId: 1,

        jobId:
            localStorage.getItem(
                "selectedJobId"
            ),

        status: "Applied"
    };

    const response = await fetch(

        "http://localhost:8080/api/applications",

        {
            method: "POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body: JSON.stringify(
                application
            )
        }
    );

    if(response.ok){

        alert(
            "Application Submitted Successfully"
        );

        window.location.href =
            "applied-jobs.html";
    }
}
function openApplicationForm(jobId){

    alert("Clicked " + jobId);

    localStorage.setItem(
        "selectedJobId",
        jobId
    );

    window.location.href =
        "application-form.html";
}
async function submitApplication(){

    const application = {

        userId: 1,

        jobId:
            localStorage.getItem(
                "selectedJobId"
            ),

        status: "Applied"
    };

    try{

        const response = await fetch(
            "http://localhost:8080/api/applications",
            {
                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify(
                    application
                )
            }
        );

        if(response.ok){

            alert(
                "Application Submitted Successfully"
            );

            window.location.href =
                "applied-jobs.html";
        }

    }catch(error){

        console.error(error);

        alert(
            "Application Failed"
        );
    }
}
async function submitApplication(){

    const application = {

        userId: 1,

        jobId: localStorage.getItem(
            "selectedJobId"
        ),

        status: "Applied",

        name: document.getElementById(
            "name"
        ).value,

        email: document.getElementById(
            "email"
        ).value,

        phone: document.getElementById(
            "phone"
        ).value,

        cgpa: document.getElementById(
            "cgpa"
        ).value,

        skills: document.getElementById(
            "skills"
        ).value,

        certificates: document.getElementById(
            "certificates"
        ).value,

        about: document.getElementById(
            "about"
        ).value
    };

    try{

        const response = await fetch(
            "http://localhost:8080/api/applications",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(application)
            }
        );

        if(response.ok){

            alert("Application Submitted Successfully");

            localStorage.removeItem(
                "selectedJobId"
            );

            window.location.href =
                "jobs.html";
        }
        else{

            alert("Application Failed");
        }

    }
    catch(error){

        console.error(error);

        alert("Server Error");
    }
}
async function loadSqlCount(){

    try{

        const response = await fetch(
            "http://localhost:8080/api/sql"
        );

        const data = await response.json();

        console.log("SQL Data:", data);

        document.getElementById("sqlCount").innerText =
            data.length;

    }catch(error){

        console.error("SQL Error:", error);
    }
}
async function loadDsaCount(){

    try{

        const response = await fetch(
            "http://localhost:8080/api/dsa"
        );

        const data = await response.json();

        document.getElementById(
            "dsaCount"
        ).innerText = data.length;

    }catch(error){

        console.error(error);
    }
}