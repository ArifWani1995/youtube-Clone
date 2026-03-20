document.addEventListener('DOMContentLoaded', () => {

    // DOM Elements
    const body = document.body;
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    
    // Views
    const homeView = document.getElementById('homeView');
    const videoView = document.getElementById('videoView');
    
    // Containers
    const categoriesBar = document.getElementById('categoriesBar');
    const videoGrid = document.getElementById('videoGrid');
    const sidebarSubs = document.getElementById('sidebarSubs');
    
    // Video Player Elements
    const vidTitle = document.getElementById('vidTitle');
    const mainVideoPlayer = document.getElementById('mainVideoPlayer');
    const vidChannelLogo = document.getElementById('vidChannelLogo');
    const vidChannelName = document.getElementById('vidChannelName');
    const vidChannelSubs = document.getElementById('vidChannelSubs');
    const subBtn = document.getElementById('subBtn');
    const likeBtn = document.getElementById('likeBtn');
    const vidLikes = document.getElementById('vidLikes');
    const vidDesc = document.getElementById('vidDesc');
    const vidViews = document.getElementById('vidViews');
    const vidTime = document.getElementById('vidTime');
    const vidCategoryTag = document.getElementById('vidCategoryTag');
    const suggestedList = document.getElementById('suggestedList');
    
    // Comments Elements
    const commentsList = document.getElementById('commentsList');
    const commentsCount = document.getElementById('commentsCount');
    const commentInput = document.getElementById('commentInput');
    const commentActionBtns = document.getElementById('commentActionBtns');
    const submitComment = document.getElementById('submitComment');
    const cancelComment = document.getElementById('cancelComment');

    let currentCategory = 'All';
    let searchQuery = '';
    let currentVideoId = null;

    // Initialize the app
    function init() {
        populateCategories();
        populateSidebarSubs();
        renderVideoGrid();
        
        // Setup initial display
        homeView.classList.remove('hidden');
        videoView.classList.add('hidden');
    }

    // Event Listeners
    themeToggleBtn.addEventListener('click', toggleTheme);
    menuBtn.addEventListener('click', toggleSidebar);
    
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        searchQuery = searchInput.value.toLowerCase();
        goHome();
        renderVideoGrid();
    });

    document.querySelector('.logo').addEventListener('click', () => {
        goHome();
        searchQuery = '';
        searchInput.value = '';
        currentCategory = 'All';
        renderVideoGrid();
        updateCategoryPills();
    });

    // Theme logic
    function toggleTheme() {
        body.classList.toggle('dark-mode');
        const icon = themeToggleBtn.querySelector('span');
        if (body.classList.contains('dark-mode')) {
            icon.textContent = 'light_mode';
        } else {
            icon.textContent = 'dark_mode';
        }
    }

    // Sidebar logic
    function toggleSidebar() {
        if (window.innerWidth <= 800) {
            sidebar.classList.toggle('mobile-open');
        } else {
            sidebar.classList.toggle('narrow');
        }
    }

    // Populate Sidebar Subscriptions
    function populateSidebarSubs() {
        const uniqueChannels = [...new Set(videos.map(v => JSON.stringify(v.channel)))].map(c => JSON.parse(c));
        const subHtml = uniqueChannels.slice(0, 5).map(c => `
            <a href="#" class="sidebar__link">
                <img src="${c.logo}" class="channel-icon" alt="${c.name}">
                <span>${c.name}</span>
            </a>
        `).join('');
        sidebarSubs.innerHTML = subHtml;
    }

    // Populate Categories
    function populateCategories() {
        const categories = ['All', ...new Set(videos.map(v => v.category))];
        categoriesBar.innerHTML = categories.map(cat => `
            <button class="cat-pill ${cat === currentCategory ? 'active' : ''}" data-cat="${cat}">${cat}</button>
        `).join('');

        const pills = categoriesBar.querySelectorAll('.cat-pill');
        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                currentCategory = pill.dataset.cat;
                updateCategoryPills();
                renderVideoGrid();
            });
        });
    }

    function updateCategoryPills() {
        const pills = categoriesBar.querySelectorAll('.cat-pill');
        pills.forEach(pill => {
            if (pill.dataset.cat === currentCategory) {
                pill.classList.add('active');
            } else {
                pill.classList.remove('active');
            }
        });
    }

    // Render Video Grid (Home)
    function renderVideoGrid() {
        let filteredVideos = videos.filter(v => {
            const matchesCat = currentCategory === 'All' || v.category === currentCategory;
            const matchesSearch = v.title.toLowerCase().includes(searchQuery) || v.channel.name.toLowerCase().includes(searchQuery);
            return matchesCat && matchesSearch;
        });

        if (filteredVideos.length === 0) {
            videoGrid.innerHTML = `<h3>No videos found. Try a different search.</h3>`;
            return;
        }

        videoGrid.innerHTML = filteredVideos.map(video => `
            <div class="video-card" onclick="playVideo('${video.id}')">
                <div class="video-thumbnail">
                    <img src="${video.thumbnail}" alt="${video.title}">
                    <div class="vid-duration">${video.duration}</div>
                </div>
                <div class="video-info">
                    <img src="${video.channel.logo}" class="channel-avatar" alt="${video.channel.name}">
                    <div class="video-details">
                        <h3 class="vid-title">${video.title}</h3>
                        <p class="vid-channel-name">${video.channel.name}</p>
                        <p class="vid-meta">${video.views} views • ${video.uploadTime}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Routing Simulation
    function goHome() {
        videoView.classList.add('hidden');
        homeView.classList.remove('hidden');
        window.scrollTo(0,0);
        mainVideoPlayer.pause();
    }

    // Global func for inline onclick
    window.playVideo = function(id) {
        currentVideoId = id;
        const video = videos.find(v => v.id === id);
        if (!video) return;

        // Switch views
        homeView.classList.add('hidden');
        videoView.classList.remove('hidden');
        window.scrollTo(0,0);
        
        // Auto-close sidebar on mobile
        sidebar.classList.remove('mobile-open');

        // Populate Player Data
        mainVideoPlayer.src = video.videoUrl;
        mainVideoPlayer.play();
        
        vidTitle.textContent = video.title;
        vidChannelLogo.src = video.channel.logo;
        vidChannelName.textContent = video.channel.name;
        vidChannelSubs.textContent = video.channel.subscribers + " subscribers";
        vidLikes.textContent = formatNumber(video.likes);
        vidViews.textContent = video.views + " views";
        vidTime.textContent = video.uploadTime;
        vidCategoryTag.textContent = "#" + video.category;
        vidDesc.textContent = video.description;

        // Reset states
        subBtn.textContent = "Subscribe";
        subBtn.classList.remove('subscribed');

        renderSuggestedVideos(video.id);
        renderComments(video.id);
    }

    // Render Suggested Videos
    function renderSuggestedVideos(currentId) {
        const suggestions = videos.filter(v => v.id !== currentId);
        suggestedList.innerHTML = suggestions.map(video => `
            <div class="suggest-card" onclick="playVideo('${video.id}')">
                <div class="suggest-thumb">
                    <img src="${video.thumbnail}" alt="${video.title}">
                    <div class="vid-duration">${video.duration}</div>
                </div>
                <div class="suggest-info">
                    <h4 class="suggest-title">${video.title}</h4>
                    <p class="suggest-meta">${video.channel.name}</p>
                    <p class="suggest-meta">${video.views} views • ${video.uploadTime}</p>
                </div>
            </div>
        `).join('');
    }

    // Format numbers
    function formatNumber(numStr) {
        return numStr; // It's already cleanly formatted in mock data, e.g. "10K"
    }

    // Video Action Listeners
    subBtn.addEventListener('click', () => {
        if (subBtn.classList.contains('subscribed')) {
            subBtn.classList.remove('subscribed');
            subBtn.textContent = 'Subscribe';
        } else {
            subBtn.classList.add('subscribed');
            subBtn.textContent = 'Subscribed';
        }
    });

    // Comments Functionality
    function renderComments(videoId) {
        const vidComments = comments[videoId] || [];
        commentsCount.textContent = `${vidComments.length} Comments`;
        
        if (vidComments.length === 0) {
            commentsList.innerHTML = `<p style="color:var(--secondary-text);margin-top:20px;">No comments yet. Be the first to comment.</p>`;
            return;
        }

        commentsList.innerHTML = vidComments.map(c => `
            <div class="comment-item">
                <img src="${c.logo}" class="comment-avatar" alt="${c.user}">
                <div class="comment-content">
                    <div class="comment-author">
                        ${c.user} <span class="comment-time">${c.time}</span>
                    </div>
                    <div class="comment-text">${c.text}</div>
                    <div class="comment-actions">
                        <span class="material-symbols-outlined">thumb_up</span>
                        <span class="comment-like-count">${c.likes}</span>
                        <span class="material-symbols-outlined" style="margin-left:8px;">thumb_down</span>
                        <span style="font-size:12px;font-weight:500;margin-left:12px;cursor:pointer;">Reply</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Comment Input Handlers
    commentInput.addEventListener('focus', () => {
        commentActionBtns.classList.remove('hidden');
    });

    commentInput.addEventListener('input', () => {
        if (commentInput.value.trim().length > 0) {
            submitComment.classList.remove('disabled');
        } else {
            submitComment.classList.add('disabled');
        }
    });

    cancelComment.addEventListener('click', () => {
        commentInput.value = '';
        commentActionBtns.classList.add('hidden');
    });

    submitComment.addEventListener('click', () => {
        const text = commentInput.value.trim();
        if (!text || !currentVideoId) return;

        if (!comments[currentVideoId]) {
            comments[currentVideoId] = [];
        }

        comments[currentVideoId].unshift({
            user: "You",
            logo: "https://ui-avatars.com/api/?name=You&background=random",
            text: text,
            time: "Just now",
            likes: "0"
        });

        commentInput.value = '';
        commentActionBtns.classList.add('hidden');
        renderComments(currentVideoId);
    });

    // Start App
    init();

});
