function loadFromYAML() {
  try {
    const data = jsyaml.load(yamlData);
    const sets = data.lego_sets;

    // Sort by order descending
    sets.sort((a, b) => b.order - a.order);

    const table = document.getElementById("lego-table");

    sets.forEach(set => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>
          <a href="${set.url}" target="_blank">${set.set_number}</a>
        </td>

        <td class="set-name" data-img="${set.image}">
          ${set.set_name}
        </td>

        <td>${set.purchase_date}</td>
        <td>${set.price}</td>
        <td class="right">${set.order}</td>
      `;

      table.appendChild(row);
    });

    enableHoverPreview();

  } catch (e) {
    console.error("YAML parse error:", e);
  }
}

function enableHoverPreview() {
  const preview = document.createElement("div");
  preview.className = "image-preview";
  document.body.appendChild(preview);

  const img = document.createElement("img");
  preview.appendChild(img);

  let hideTimeout = null;

  document.querySelectorAll("#lego-table tr").forEach(row => {
    const imgSrc = row.querySelector(".set-name")?.dataset.img;

    if (!imgSrc) return;

    row.addEventListener("mouseenter", () => {
      clearTimeout(hideTimeout);

      img.src = imgSrc;
      preview.style.display = "block";

      requestAnimationFrame(() => {
        preview.classList.add("visible");
      });
    });

    row.addEventListener("mousemove", (e) => {
      const padding = 24;
      const previewWidth = 360;
      const previewHeight = 360;

      let x = e.clientX + 24;
      let y = e.clientY + 24;

      // Smart edge detection
      if (x + previewWidth > window.innerWidth) {
        x = e.clientX - previewWidth - padding;
      }

      if (y + previewHeight > window.innerHeight) {
        y = e.clientY - previewHeight - padding;
      }

      preview.style.left = x + "px";
      preview.style.top = y + "px";
    });

    row.addEventListener("mouseleave", () => {
      hideTimeout = setTimeout(() => {
        preview.classList.remove("visible");

        setTimeout(() => {
          preview.style.display = "none";
        }, 180);
      }, 120);
    });
  });
}

loadFromYAML();
