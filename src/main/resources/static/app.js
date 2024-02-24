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

    document.getElementById("newEmployeeForm").addEventListener("submit", function(e) {
            e.preventDefault(); // Предотвратить стандартную отправку формы

            const formData = {
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                patronymic: document.getElementById("patronymic").value,
                phoneNumber: document.getElementById("phoneNumber").value,
                email: document.getElementById("email").value,
                country: document.getElementById("country").value,
                city: document.getElementById("city").value
            };

            fetch('/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) {
                    // Если HTTP-статус в диапазоне 4xx или 5xx, преобразуем ответ в JSON и возвращаем промис, который будет отклонен
                    return response.json().then(errorData => Promise.reject(errorData));
                }
                return response.json(); // В случае успеха преобразуем ответ в JSON
            })
            .then(data => {
                console.log('Success:', data);
                fetchEmployees(); //
            })
            .catch((error) => {
                console.error('Error:', error);
                const errorMessage = document.getElementById('errorMessage');
                const errorMessages = Object.values(error);
                const firstErrorMessage = errorMessages.length > 0 ? errorMessages[0] : "Произошла ошибка. Пожалуйста, проверьте введенные данные.";

                errorMessage.innerHTML = firstErrorMessage
                errorMessage.style.display = 'block';

                setTimeout(() => {
                        errorMessage.style.display = 'none';
                }, 5000);
            });
        });

        const countryCitiesMap = {
            "США": ["Нью-Йорк", "Лос-Анджелес", "Чикаго"],
            "Канада": ["Торонто", "Ванкувер", "Монреаль"],
            "Германия": ["Берлин", "Мюнхен", "Гамбург"],
            "Франция": ["Париж", "Марсель", "Лион"],
            "Великобритания": ["Лондон", "Манчестер", "Бирмингем"],
            "Россия": ["Москва", "Санкт-Петербург", "Новосибирск"]
        };


        document.getElementById('country').addEventListener('change', function() {
            const selectedCountry = this.value;
            const citySelect = document.getElementById('city');

            // Очистка предыдущих городов
            citySelect.innerHTML = '<option value="">Выберите город</option>';

            // Добавление городов для выбранной страны
            if(selectedCountry && countryCitiesMap[selectedCountry]) {
                countryCitiesMap[selectedCountry].forEach(city => {
                    const option = new Option(city, city);
                    citySelect.add(option);
                });
            }
        });

        document.getElementById('searchBtn').addEventListener('click', function() {
            const searchParams = {
                firstName: document.getElementById('searchFirstName').value,
                lastName: document.getElementById('searchLastName').value,
                patronymic: document.getElementById('searchPatronymic').value,
                phoneNumber: document.getElementById('searchPhoneNumber').value,
                email: document.getElementById('searchEmail').value,
                country: document.getElementById('searchCountry').value,
                city: document.getElementById('searchCity').value
            };

            // Формирование строки запроса
            const queryString = Object.entries(searchParams)
                .filter(([_, value]) => value.trim() !== '')
                .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                .join('&');

            fetch(`/api/employees/search?${queryString}`)
                .then(response => response.json())
                .then(data => {
                    displayEmployees(data)
                })
                .catch(error => console.error('Ошибка при выполнении поиска:', error));
        });

});
