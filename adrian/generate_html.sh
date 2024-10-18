#!/bin/bash

# Variables
data_file="record.txt"
output_file="index.html"
css_file="style.css"

# Create CSS file (only once, will not be recreated)
if [ ! -f "$css_file" ]; then
  cat <<EOF > $css_file
body {
    font-family: Arial, sans-serif;
    height: 100vh;
    margin: 0;
}

.container {
    width: 80%;
    max-width: 800px;
    margin: 0 auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
}

table, th, td {
    border: 1px solid black;
}

th, td {
    padding: 12px;
}

th {
    background-color: #4CAF50;
    color: white;
    text-align: center;
}

td {
    text-align: left;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}

tr:nth-child(odd) {
    background-color: #e6f7ff;
}

@media (orientation: landscape) {
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    h1 {
        text-align: center;
    }
}
EOF
fi

# Read data into an array
mapfile -t lines < "$data_file"

# Create HTML file
cat <<EOF > $output_file
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recorded Progress</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Recorded Progress</h1>
    <div class="container">
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Weekday</th>
                    <th>Recorded Progress</th>
                    <th>Order</th>
                </tr>
            </thead>
            <tbody>
EOF

# Reverse loop over data and add "Order" column starting from 0001
order_num=$(printf "%04d" ${#lines[@]})
for ((i=${#lines[@]}-1; i>=0; i--)); do
    IFS=',' read -r date weekday progress <<< "${lines[i]}"
    echo "                <tr><td>$date</td><td>$weekday</td><td>$progress</td><td>$order_num</td></tr>" >> $output_file
    order_num=$(printf "%04d" $((10#$order_num - 1)))
done

# Close the HTML structure
cat <<EOF >> $output_file
            </tbody>
        </table>
    </div>
</body>
</html>
EOF

echo "HTML file generated: $output_file"
