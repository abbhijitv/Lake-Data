document.addEventListener('DOMContentLoaded', () => {
    
    //initial call after dom is loaded
    createTable(2023);
    
    document.getElementById('yearSelect').addEventListener('change', (event) => {
        const year = event.target.value;
        //call to create table after select is updated
        createTable(year);
    })
});


function createTable(year)
{
    //access data based on year selected
    data_file = 'data/tempe-town-lake-data-' + year + '.csv';

    //access csv file using d3,
    d3.csv(data_file).then(data => {
        const tbody = document.querySelector("#display-table tbody");
        tbody.innerHTML = "";

        data.forEach(row => {
            const tr = document.createElement('tr');

            Object.values(row).forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                tr.appendChild(td);
            });

            tbody.appendChild(tr);
        });

        //for calc'ing avg's
        let sum_pH = 0, sum_temperature = 0, sum_doxygen = 0, sum_transparency = 0, count = 0;

        data.forEach(row => {
            count++;
            sum_pH += parseFloat(row['PH']);
            sum_temperature += parseFloat(row['Temperature']);
            sum_doxygen += parseFloat(row['Dissolved Oxygen']);
            sum_transparency += parseFloat(row['Transparency']);
        });

        const tr_avg = document.createElement('tr');

        const td_annual_avg = document.createElement('td');
        td_annual_avg.textContent = 'Annual Average';
        tr_avg.appendChild(td_annual_avg);

        const td_ph = document.createElement('td');
        td_ph.textContent = `${(sum_pH/count).toFixed(2)}`;
        tr_avg.appendChild(td_ph);

        //console.log(sum_temperature);
        const td_temp = document.createElement('td');
        td_temp.textContent = `${(sum_temperature/count).toFixed(2)}`;
        tr_avg.appendChild(td_temp);

        const td_doxygen = document.createElement('td');
        td_doxygen.textContent = `${(sum_doxygen/count).toFixed(2)}`;
        tr_avg.appendChild(td_doxygen);
        
        const td_trans = document.createElement('td');
        td_trans.textContent = `${(sum_transparency/count).toFixed(2)}`;
        tr_avg.appendChild(td_trans);

        tbody.appendChild(tr_avg);
    });
}