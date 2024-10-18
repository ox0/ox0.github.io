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
    display: flex;
    justify-content: center;
    align-items: center;
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
    text-align: center;
}

th {
    background-color: #4CAF50;
    color: white;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}

tr:nth-child(odd) {
    background-color: #e6f7ff;
}
EOF
fi

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
    <div class="container">
        <h1>Recorded Progress</h1>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Weekday</th>
                    <th>Recorded Progress</th>
                </tr>
            </thead>
            <tbody>
EOF

# Parse data and append rows to the table
while IFS=',' read -r date weekday progress
do
    echo "                <tr><td>$date</td><td>$weekday</td><td>$progress</td></tr>" >> $output_file
done < "$data_file"

# Close the HTML structure
cat <<EOF >> $output_file
            </tbody>
        </table>
    </div>
</body>
</html>
EOF

echo "HTML file generated: $output_file"
