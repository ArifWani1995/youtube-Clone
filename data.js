const videos = [
    {
        id: "v1",
        title: "Building a YouTube Clone with HTML, CSS, and JS",
        thumbnail: "https://images.unsplash.com/photo-1627398240360-1d898ba27409?auto=format&fit=crop&q=80&w=600",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        duration: "15:20",
        views: "1.2M",
        uploadTime: "2 days ago",
        channel: {
            name: "Code Academy",
            logo: "https://ui-avatars.com/api/?name=CA&background=random",
            subscribers: "500K"
        },
        likes: "45K",
        dislikes: "1.2K",
        category: "Education",
        description: "In this comprehensive tutorial, we build a YouTube clone from scratch. Like and subscribe!"
    },
    {
        id: "v2",
        title: "Top 10 PC Games of 2026 - Ultimate Graphics",
        thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        duration: "22:15",
        views: "3.4M",
        uploadTime: "5 hours ago",
        channel: {
            name: "GamerZ",
            logo: "https://ui-avatars.com/api/?name=GZ&background=random",
            subscribers: "2.1M"
        },
        likes: "125K",
        dislikes: "3K",
        category: "Gaming",
        description: "Checking out the most insane PC games released this year. Ray tracing on!"
    },
    {
        id: "v3",
        title: "Relaxing Lofi Beats - Chill Study Music",
        thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        duration: "1:00:00",
        views: "10M",
        uploadTime: "1 month ago",
        channel: {
            name: "Lofi Girl",
            logo: "https://ui-avatars.com/api/?name=LG&background=random",
            subscribers: "12M"
        },
        likes: "500K",
        dislikes: "2K",
        category: "Music",
        description: "A continuous stream of relaxing lofi hip hop beats to study / relax to."
    },
    {
        id: "v4",
        title: "SpaceX Starship Launch - Multi-Camera View",
        thumbnail: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=600",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        duration: "08:45",
        views: "8.5M",
        uploadTime: "1 week ago",
        channel: {
            name: "Space Today",
            logo: "https://ui-avatars.com/api/?name=ST&background=random",
            subscribers: "1.5M"
        },
        likes: "200K",
        dislikes: "4K",
        category: "Science",
        description: "Watch the incredible launch of the latest Starship prototype from multiple angles."
    },
    {
        id: "v5",
        title: "Mastering React in 10 Minutes",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        duration: "10:05",
        views: "890K",
        uploadTime: "3 days ago",
        channel: {
            name: "Web Dev Simplified",
            logo: "https://ui-avatars.com/api/?name=WD&background=random",
            subscribers: "800K"
        },
        likes: "60K",
        dislikes: "500",
        category: "Education",
        description: "Learn the core concepts of React incredibly fast."
    },
    {
        id: "v6",
        title: "Funny Cat Compilation - Try Not To Laugh",
        thumbnail: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        duration: "12:30",
        views: "15M",
        uploadTime: "2 months ago",
        channel: {
            name: "MeowTube",
            logo: "https://ui-avatars.com/api/?name=MT&background=random",
            subscribers: "5M"
        },
        likes: "400K",
        dislikes: "10K",
        category: "Entertainment",
        description: "The funniest clips of cats falling, jumping, and being weird."
    },
    {
        id: "v7",
        title: "How to Cook the Perfect Steak",
        thumbnail: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=600",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        duration: "09:12",
        views: "2.1M",
        uploadTime: "6 months ago",
        channel: {
            name: "Chef Gordon",
            logo: "https://ui-avatars.com/api/?name=CG&background=random",
            subscribers: "3.2M"
        },
        likes: "150K",
        dislikes: "1.5K",
        category: "Cooking",
        description: "Master the art of cooking steak with these pro tips."
    },
    {
        id: "v8",
        title: "10-Minute Morning Routine for Beginners",
        thumbnail: "https://images.unsplash.com/photo-1445384763658-0400939829cd?auto=format&fit=crop&q=80&w=600",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        duration: "11:20",
        views: "4.5M",
        uploadTime: "1 year ago",
        channel: {
            name: "Healthy Life",
            logo: "https://ui-avatars.com/api/?name=HL&background=random",
            subscribers: "2.8M"
        },
        likes: "250K",
        dislikes: "2K",
        category: "Fitness",
        description: "Start your day right with this quick morning routine."
    }
];

const comments = {
    "v1": [
        { user: "DevUser99", logo: "https://ui-avatars.com/api/?name=D&background=random", text: "This is exactly what I was looking for! Perfect explanation.", time: "1 day ago", likes: "120" },
        { user: "UI_Ninja", logo: "https://ui-avatars.com/api/?name=U&background=random", text: "The CSS grid part was super helpful.", time: "12 hours ago", likes: "45" }
    ],
    "v2": [
        { user: "GamerBob", logo: "https://ui-avatars.com/api/?name=GB&background=random", text: "I can't wait to play the first one. Graphics look insane!!", time: "2 hours ago", likes: "230" }
    ]
};
