fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
  .then((res) => res.json())
  .then((data) => {
    loadAllIssues(data.data);
  });
function loadAllIssues(cardData) {
  //   console.log(cardData);

  const totalIssues = document.getElementById("total-issues");
  totalIssues.innerText = cardData.length;

  const issuesContainer = document.getElementById("issues-container");
  issuesContainer.innerHTML = "";

  cardData.forEach((card) => {
    // console.log(card.labels);
    const cardDiv = document.createElement("div");

    let statusIcon = "";

    if (card.status === "open") {
      statusIcon = "assets/Open-Status.png";
    } else if (card.status === "closed") {
      statusIcon = "assets/Closed-Status.png";
    }

    // looping over label array
    let cardLabels = "";
    card.labels.forEach((label) => {
      cardLabels += `
    <span class="px-3 py-1 bg-yellow-100 border border-gray-200 text-[#d97706] rounded-3xl font-semibold">
      ${label}
    </span>
  `;
    });


    cardDiv.innerHTML = `
  
  <div class="card h-full bg-base-100 shadow-sm border-top-green flex flex-col">

                    <div class="p-4 space-y-4 flex-1">
                        <div class="flex items-center justify-between">
                            <img class="" src=${statusIcon} alt="">
                           
                            <span
                                class="px-8 py-1 bg-[#feececFF] text-red-500 rounded-3xl font-semibold">${card.priority}</span>
                        </div>
                        <div class="mt-6 flex flex-col gap-2 py-4">
                            <p class="text-2xl font-bold">${card.title}</p>
                            <p class="text-gray-400 text-lg overflow-hidden text-ellipsis">${card.description}
                            </p>
                        </div>
                        <div class="flex items-center gap-4 flex-wrap">
                            ${cardLabels}
                        </div>
                    </div>

                    <div class="shadow-sm p-4 border-t-gray-700">
                        <p class="text-gray-400 text-sm font-medium">${card.author}</p>
                        <p class="text-gray-400 text-sm font-medium">${card.updatedAt}</p>
                    </div>

                </div>
                                
                                `;
    issuesContainer.appendChild(cardDiv);
  });
}

// loadAllIssues();
