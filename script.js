 const cards = [
    {photo: "./images/1959b06e7f5d4163ea9599946af07d3d52f61d21.jpg", cardCat: "Marketing", cardCourseName: "The Ultimate Google Ads Training Course", cardInfoPrice: 100, cardInfoTeacherName: "by Jerome Bell"},
    {photo: "./images/1adcaf7957590e8cdfee47506b5afbb5f1d3d251.jpg", cardCat: "Management", cardCourseName: "Prduct Management Fundamentals", cardInfoPrice: 480, cardInfoTeacherName: "by Marvin McKinney"},
    {photo: "./images/1c5469059ec3475582a6f6129b6ad3aed940c4d0.jpg", cardCat: "HR & Recruting", cardCourseName: "HR  Management and Analytics", cardInfoPrice: 200, cardInfoTeacherName: "by Leslie Alexander Li"},
    {photo: "./images/26b7504f2f3ca140714e87c67d19cee808f942e3.jpg", cardCat: "Marketing", cardCourseName: "Brand Management & PR Communications", cardInfoPrice: 530, cardInfoTeacherName: "by Kristin Watson"},
    {photo: "./images/39a7972cf1e363e8eb007225e0b26ec15b87aa9b.jpg", cardCat: "Design", cardCourseName: "Graphic Design Basic", cardInfoPrice: 500, cardInfoTeacherName: "by Guy Hawkins"},
    {photo: "./images/4dc0c01cdada93a61e7f51ac6388e22a998e52c3.jpg", cardCat: "Management", cardCourseName: "Business Development Management", cardInfoPrice: 400, cardInfoTeacherName: "by Dianne Russell"},
    {photo: "./images/56e453da1f9df64680ce9ae8deb70c4fd6494a76.jpg", cardCat: "Development", cardCourseName: "Highload Software Architecture", cardInfoPrice: 600, cardInfoTeacherName: "by Brooklyn Simmons"},
    {photo: "./images/c63086c15719088561c8ec14b31455901e6aced2.jpg", cardCat: "HR & Recruting", cardCourseName: "Human Resources – Selection and Recruitment", cardInfoPrice: 150, cardInfoTeacherName: "by Kathryn Murphy"},
    {photo: "./images/e6c7967bad5827ead11861fa456bdb395058c281.jpg", cardCat: "Design", cardCourseName: "User Experience. Human-centered Design", cardInfoPrice: 240, cardInfoTeacherName: "by Cody Fisher"}
]
        let currentCategory = 'all';
        let currentSearch = '';
        let searchTimeout = null;
        

        const cardsContainer = document.getElementById('cards');
        

        const searchInput = document.querySelector('input.nav-search');
        
        const navCategories = document.querySelectorAll('.nav-category');
        

        function getCategoryClass(category) {
            const categoryMap = {
                'Marketing': 'category-marketing',
                'Management': 'category-management',
                'HR & Recruting': 'category-hr',
                'Design': 'category-design',
                'Development': 'category-development'
            };
            
            return categoryMap[category] || '';
        }
        

        function normalizeString(str) {
            if (!str) return '';
            return str.toString().toLowerCase().trim();
        }
        

        function renderCards() {
            let filteredCards = cards;
            

            if (currentCategory !== 'all') {
                filteredCards = filteredCards.filter(card => 
                    normalizeString(card.cardCat) === normalizeString(currentCategory)
                );
            }
            

            if (currentSearch && currentSearch.length >= 2) {
                const searchTerm = normalizeString(currentSearch);
                
                filteredCards = filteredCards.filter(card => {
                    const inTitle = normalizeString(card.cardCourseName).includes(searchTerm);
                    const inCategory = normalizeString(card.cardCat).includes(searchTerm);
                    const inTeacher = normalizeString(card.cardInfoTeacherName).includes(searchTerm);
                    
                    return inTitle || inCategory || inTeacher;
                });
            }
            

            cardsContainer.innerHTML = '';
            

            filteredCards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.className = 'card';
                cardElement.innerHTML = `
                    <div class="card-photo">
                        <img src="${card.photo}" alt="${card.cardCourseName}"/>
                    </div>
                    <div class="card-text">
                        <div class="card-category ${getCategoryClass(card.cardCat)}">
                            ${card.cardCat}
                        </div>
                        <div class="card-course-name">${card.cardCourseName}</div>
                        <div class="card-info">
                            <div class="card-info-price">$${card.cardInfoPrice}</div>
                            <div class="card-info-teacher-name">${card.cardInfoTeacherName}</div>
                        </div>
                    </div>
                `;
                cardsContainer.appendChild(cardElement);
            });
            
        }
        
        function filterByCategory(category) {

            navCategories.forEach(cat => {
                cat.classList.remove('active');
            });
            

            const selectedCategory = Array.from(navCategories).find(
                cat => cat.dataset.category === category
            );
            
            if (selectedCategory) {
                selectedCategory.classList.add('active');
            }
            

            currentCategory = category;
            

            if (searchInput) {
                searchInput.value = '';
                currentSearch = '';
            }
            
            renderCards();
        }
        
        function filterBySearch(searchTerm) {
            currentSearch = searchTerm;
            renderCards();
        }
        
        renderCards();
        
        navCategories.forEach(categoryElement => {
            categoryElement.addEventListener('click', function() {
                const category = this.dataset.category;
                filterByCategory(category);
            });
        });
        
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                const searchValue = e.target.value;
                
                if (searchTimeout) {
                    clearTimeout(searchTimeout);
                }
                
                searchTimeout = setTimeout(() => {
                    filterBySearch(searchValue);
                }, 300);
            });
            
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    filterBySearch(e.target.value);
                }
            });
        }
    
