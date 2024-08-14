document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll('.tabs a');
    const tabContents = document.querySelectorAll('.tab-content');
    const themeSelect = document.getElementById('theme-select');
    const body = document.body;

    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('href').substring(1);
            switchTabs(tabId);
        });
    });

    themeSelect.addEventListener('change', function() {
        body.className = 'theme-' + this.value;
    });

    function switchTabs(tabId) {
        tabContents.forEach(content => {
            if (content.id === tabId) {
                content.style.display = 'block';
                loadMarkdownContent(tabId);
            } else {
                content.style.display = 'none';
            }
        });
    }

    function loadMarkdownContent(tabId) {
        const contentDiv = document.getElementById(`${tabId}-content`);
        const markdownFile = `${tabId}.md`;

        console.log(markdownFile, contentDiv);

        fetch(markdownFile)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${markdownFile}`);
                }
                return response.text();
            })
            .then(data => {
                // Convert Markdown to HTML
                const converter = new showdown.Converter();
                const html = converter.makeHtml(data);
                contentDiv.innerHTML = html;

                console.log(html);
            })
            .catch(error => {
                console.error('Error loading markdown:', error);
                contentDiv.innerHTML = `<p>Failed to load content.</p>`;
            });
    }

    // Show the README tab by default
    switchTabs('README');
});
