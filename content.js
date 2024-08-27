function addLinkToPeopleTab() {
    const peopleTab = document.querySelector('a[data-control-name="page_member_main_nav_people_tab"]');
    if (peopleTab && !peopleTab.nextElementSibling?.classList.contains('custom-search-link')) {
      const companyName = document.querySelector('h1')?.textContent.trim();
      if (companyName) {
        const searchLink = document.createElement('a');
        searchLink.href = `https://www.linkedin.com/search/results/people/?currentCompany=["${encodeURIComponent(companyName)}"]`;
        searchLink.target = '_blank';
        searchLink.classList.add('custom-search-link');
        searchLink.innerHTML = '🔍';
        searchLink.style.marginLeft = '5px';
        searchLink.title = 'Open People Search for this company';
        peopleTab.parentNode.insertBefore(searchLink, peopleTab.nextSibling);
      }
    }
  }
  
  // Run the function initially and then every 2 seconds
  addLinkToPeopleTab();
  setInterval(addLinkToPeopleTab, 2000);