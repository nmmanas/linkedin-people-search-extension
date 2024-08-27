let lastKnownPeopleTab = null;

function addLinkToPeopleTab() {
  // Find all nav items
  const navItems = document.querySelectorAll('li[class*="org-page-navigation__item"]');

  // Find the "People" nav item
  const peopleNavItem = Array.from(navItems).find(item => 
    item.textContent.trim().toLowerCase() === 'people'
  );

  // Check if the "People" tab exists and is different from the last known one
  if (peopleNavItem && peopleNavItem !== lastKnownPeopleTab) {
    lastKnownPeopleTab = peopleNavItem;

    // Remove any existing custom link to avoid duplicates
    const existingLink = document.querySelector('.custom-search-link');
    if (existingLink) {
      existingLink.remove();
    }

    // Extract company ID from the page source
    const companyId = extractCompanyId();

    // Construct the search URL including whatever companyId we get
    const searchUrl = `https://www.linkedin.com/search/results/people/?currentCompany=%5B%22${encodeURIComponent(companyId)}%22%5D&origin=GLOBAL_SEARCH_HEADER`;

    // Create the search link
    const searchLink = document.createElement('a');
    searchLink.href = searchUrl;
    searchLink.target = '_blank';
    searchLink.classList.add('custom-search-link');
    searchLink.innerHTML = '🔍';
    searchLink.style.marginLeft = '5px';
    searchLink.style.textDecoration = 'none';
    searchLink.title = 'Search People for this company';

    // Adjust the positioning to be inline with the "People" text
    searchLink.style.display = 'inline-flex';
    searchLink.style.alignItems = 'center';

    // Insert the search icon right after the "People" nav item, outside of its anchor
    peopleNavItem.insertAdjacentElement('afterend', searchLink);
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

// Continuously monitor the DOM and reapply the link as needed
setInterval(addLinkToPeopleTab, 1000);
