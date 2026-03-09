let allIssues = [];

const spinner = document.getElementById("loading-spinner");
spinner.classList.remove("hidden");

fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
  .then((res) => res.json())
  .then((data) => {
    allIssues = data.data;
    loadAllIssues(allIssues);
    setActive("tab-all");
    spinner.classList.add("hidden");
  });

function loadAllIssues(cardData) {
  //   console.log(cardData);

  const totalIssues = document.getElementById("total-issues");
  totalIssues.innerText = cardData.length;

  const issuesContainer = document.getElementById("issues-container");
  issuesContainer.innerHTML = "";

  cardData.forEach((card) => {
    console.log(card);
    const cardDiv = document.createElement("div");

    let borderClass = "";

    if (card.status === "open") {
      borderClass = "border-top-green";
    } else if (card.status === "closed") {
      borderClass = "border-top-purple";
    }

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
  
  <div class="card h-full issue-card bg-base-100 shadow-sm ${borderClass} flex flex-col" data-id="${card.id}">

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

                    <div class="grid grid-cols-2 gap-3 shadow-sm  p-4 border-t-gray-700 space-y-4">
                       <div class="text-start">
                        <p class="pb-2 text-gray-400 text-xs font-bold">${card.author}</p>
                        <p class="text-gray-400 text-xs font-bold">${card.createdAt}</p>
                       </div>
                       <div class="text-end">
                       <p class="pb-2 text-gray-400 text-xs font-bold">${card.updatedAt}</p>
                       <p class="text-gray-400 text-xs font-bold">${card.assignee}</p>
                       </div>
                    </div>

                </div>
                                
                                `;
    issuesContainer.appendChild(cardDiv);
  });
}

// active button logic

function setActive(activeId) {
  document.getElementById("tab-all").classList.remove("active-tab");
  document.getElementById("tab-open").classList.remove("active-tab");
  document.getElementById("tab-closed").classList.remove("active-tab");

  document.getElementById(activeId).classList.add("active-tab");
}

// btn-logics for ALL tabs
document.getElementById("tab-all").addEventListener("click", function () {
  setActive("tab-all");
  loadAllIssues(allIssues);
});

// btn-logics for Open tabs
document.getElementById("tab-open").addEventListener("click", function () {
  setActive("tab-open");
  const tabOpen = allIssues.filter((openIssues) => {
    return openIssues.status === "open";
  });
  loadAllIssues(tabOpen);
});

// btn-logics for Closed tabs
document.getElementById("tab-closed").addEventListener("click", function () {
  setActive("tab-closed");
  const tabClosed = allIssues.filter((closedIssues) => {
    return closedIssues.status === "closed";
  });
  loadAllIssues(tabClosed);
});

// modal logic starts here
document
  .getElementById("issues-container")
  .addEventListener("click", function (event) {
    const card = event.target.closest(".issue-card");

    if (!card) return;

    const issueId = card.dataset.id;

    loadSingleIssue(issueId);
  });

function loadSingleIssue(id) {
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const issue = data.data;

      const statusElement = document.getElementById("modal-status");

      if (issue.status === "open") {
        statusElement.innerText = "Open";
        statusElement.className = "badge badge-success";
      } else {
        statusElement.innerText = "Closed";
        statusElement.className = "badge badge-secondary";
      }

      document.getElementById("modal-title").innerText = issue.title;

      document.getElementById("modal-description").innerText =
        issue.description;

      document.getElementById("modal-author").innerText = issue.author;

      document.getElementById("modal-priority").innerText = issue.priority;

      document.getElementById("modal-assignee").innerText = issue.assignee
        ? issue.assignee
        : "Unassigned";

      document.getElementById("modal-date").innerText = new Date(
        issue.createdAt,
      ).toLocaleDateString();

      // Labels rendering
      const labelsContainer = document.getElementById("modal-labels");

      labelsContainer.innerHTML = "";

      issue.labels.forEach((label) => {
        labelsContainer.innerHTML += `
          <span class="px-3 py-1 bg-yellow-100 border border-gray-200 text-[#d97706] rounded-3xl font-semibold">
            ${label}
          </span>
        `;
      });

      // Open modal
      document.getElementById("issue-modal").showModal();
    });
}

// search functionality

document.getElementById("search-btn").addEventListener("click", function () {
  const searchInput = document.getElementById("search-input");
  const searchInputValue = searchInput.value;
  searchIssues(searchInputValue);
});

function searchIssues(searchText) {
  if (!searchText) {
    loadAllIssues(allIssues);
    return;
  }

  fetch(
    ` https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`,
  )
    .then((res) => res.json())
    .then((data) => {
      loadAllIssues(data.data);
    });
}
