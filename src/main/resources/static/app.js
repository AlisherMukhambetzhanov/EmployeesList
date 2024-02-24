function displayEmployees(employees) {
    const employeeList = document.getElementById('employeeList');
    employeeList.innerHTML = ''; // Очистка списка сотрудников перед добавлением новых

    employees.forEach(employee => {
        const employeeItem = document.createElement('div');
        employeeItem.className = 'employee-item';
        employeeItem.innerHTML = `
            <p>Имя: ${employee.firstName}</p>
            <p>Фамилия: ${employee.lastName}</p>
            <p>Телефон: ${employee.phoneNumber}</p>
            <p>Email: ${employee.email}</p>
            <p>Страна: ${employee.country}</p>
            <p>Город: ${employee.city}</p>
        `;
        employeeList.appendChild(employeeItem);
    });
}

function fetchEmployees() {
    fetch('/api/employees')
        .then(response => response.json())
        .then(data => {
            displayEmployees(data);
        })
        .catch(error => console.error('Ошибка при получении данных о сотрудниках:', error));
}


document.addEventListener('DOMContentLoaded', function() {
    fetchEmployees();
});

