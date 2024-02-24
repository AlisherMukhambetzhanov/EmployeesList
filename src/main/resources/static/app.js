function displayEmployees(employees) {
    const employeeList = document.getElementById('employeeList');
    employeeList.innerHTML = '';

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
            <button onclick="deleteEmployee(${employee.id})" class="delete-btn">Удалить</button>
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

function deleteEmployee(employeeId) {
    fetch(`/api/employees/${employeeId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if(response.ok) {
            fetchEmployees();
        }
    })
    .catch(error => console.error('Ошибка при удалении сотрудника:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    fetchEmployees();

    document.getElementById("loadEmployeesBtn").addEventListener("click", function() {
            fetchEmployees();
        });
});
