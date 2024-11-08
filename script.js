// Foiz hisoblash funksiyasi
function calculateInterest() {
    // Formadan qiymatlarni olish
    const deposit = parseFloat(document.getElementById('deposit').value);
    const days = parseInt(document.getElementById('days').value);
    const interestRate = parseFloat(document.getElementById('interest').value);

    // Eslatma: Foizni kunlik o'qishga to'g'ridan-to'g'ri yuklash
    if (isNaN(deposit) || isNaN(days) || isNaN(interestRate)) {
        alert("Iltimos, barcha maydonlarni to'g'ri kiriting.");
        return;
    }

    // Jami foizlar va hisob-kitob uchun kerakli o'zgaruvchilar
    let totalAmount = deposit;
    let totalInterest = 0;

    // Jadval tanlangan kunlar soni uchun
    const tableBody = document.getElementById('resultTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Jadvalni tozalash

    for (let day = 1; day <= days; day++) {
        // Har kunlik foiz hisoblash
        const dailyInterest = (totalAmount * (interestRate / 100));
        totalInterest += dailyInterest;
        totalAmount += dailyInterest;

        // Jadval qatorini yaratish
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = day;
        row.insertCell(1).textContent = deposit.toFixed(2);
        row.insertCell(2).textContent = dailyInterest.toFixed(2);
        row.insertCell(3).textContent = totalAmount.toFixed(2);

        // Bajarilishi kerak deb nomlangan bo'sh katak
        const emptyCell1 = row.insertCell(4); // Bo'sh katak
        emptyCell1.innerHTML = `<input type="text" placeholder="Bajarilishi kerak" class="plus-minus">`;
    }

    // Yakuniy hisobotni yangilash
    const finalReport = document.getElementById('finalReport');
    finalReport.innerHTML = `
        <h2>Yakuniy Hisobot</h2>
        <p>Siz ${days} kun davomida ${interestRate}% kunlik foiz bilan hisobladingiz.</p>
        <p>Jami qo'shilgan foiz: $${totalInterest.toFixed(2)}</p>
        <p>So'nggi umumiy balans: $${totalAmount.toFixed(2)}</p>
        <button onclick="goBack()">Ortga qaytish</button>
        <button onclick="printTable()">Jadvalni Chop Etish</button>
    `;
}

// Ortga qaytish funksiyasi
function goBack() {
    document.getElementById('interestForm').reset(); // Formani tozalash
    document.getElementById('resultTable').getElementsByTagName('tbody')[0].innerHTML = ''; // Jadvalni tozalash
    document.getElementById('finalReport').innerHTML = ''; // Yakuniy hisobotni tozalash
}

// Jadvalni chop etish funksiyasi
function printTable() {
    window.print(); // Browserning print funktsiyasini chaqiradi
}

// Event listener qo'shish
document.getElementById('interestForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Formani yuborishni to'xtatish
    calculateInterest();
});
