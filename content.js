function addLinkToPeopleTab() {
    // Find all nav items
    const navItems = document.querySelectorAll('li[class*="org-page-navigation__item"]');
    
    // Find the "People" nav item
    const peopleNavItem = Array.from(navItems).find(item => 
      item.textContent.trim().toLowerCase() === 'people'
    );
  
    if (peopleNavItem && !peopleNavItem.querySelector('.custom-search-link')) {
      // Extract company ID from the page source
      const companyId = extractCompanyId();
  
      // Construct the search URL including whatever companyId we get
      const searchUrl = `https://www.linkedin.com/search/results/people/?currentCompany=%5B%22${encodeURIComponent(companyId)}%22%5D&origin=GLOBAL_SEARCH_HEADER`;
  
      // Create and append the search link
      const searchLink = document.createElement('a');
      searchLink.href = searchUrl;
      searchLink.target = '_blank';
      searchLink.classList.add('custom-search-link');
      searchLink.innerHTML = '🔍';
      searchLink.style.marginLeft = '5px';
      searchLink.style.textDecoration = 'none';
      searchLink.title = 'Search People for this company';
  
      // Append the search icon to the "People" nav item
      peopleNavItem.appendChild(searchLink);
    }
  }
  
  function extractCompanyId() {
    // Search for the company ID in the page source code
    const pageSource = document.documentElement.innerHTML;
    const idMatch = pageSource.match(/urn:li:fsd_company:(\d+)/);
    
    // If a match is found, return the company ID
    if (idMatch) {
      return idMatch[1];
    }
  
    // If no ID is found, return an empty string (will result in a generic search URL)
    return '';
  }
  
  // Run the function initially and then every 2 seconds
  addLinkToPeopleTab();
  setInterval(addLinkToPeopleTab, 2000);
  