$(document).ready(function () {
    const windowHeight = $(window).height();

    // function to add and calculate height for specific class/element based from browser window
    function adjustElementSize() {
        const newHeight = windowHeight * 0.6;
        $('.lower-section').css('height', newHeight + 'px');
    }
    $(window).resize(() => adjustElementSize());

    // Start of JQuery for play button and embedded youtube video
    $('#play-button').on('click', function () {
        $('#embedded-yt').attr('src', 'https://www.youtube.com/embed/1ux_LZzTPOw?autoplay=1&mute=1');
        $('#player-container').fadeIn(500);
        $('#hide-button').show();
    });

    $('#hide-button').on('click', function () {
        // Smoothly hide the video container
        $('#player-container').fadeOut(500, function () {
            // Reset the src attribute after the fade-out animation is complete
            // to allow embedded video to restart
            $('#embedded-yt').attr('src', '');
        });

        // Hide the hide button
        $(this).hide();
        $('#play-button').show();
    });
    // End of JQuery for play button and embedded youtube video

    // Start of smooth scroll for navigation links and active section indicators
    $('a[href^="#"]').on('click', function (event) { // function to scroll in the central part of the target element
        event.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            const targetOffset = target.offset().top - 15;
            const targetHeight = target.outerHeight(); // overall height including padding/margin
            const middleOfElement = targetOffset + (targetHeight - windowHeight) / 2;

            $('html, body').stop().animate({
                scrollTop: middleOfElement
            }, 1000, () => updateActiveSectionIndicator($(window).scrollTop()));
        }
    });

    // Update active section indicator based on scroll position
    // Update function when user scrolls to a section
    $(window).on('scroll', function () {
        const scrollPosition = $(window).scrollTop();
        updateActiveSectionIndicator(scrollPosition);
    });

    // Function to update active section indicator
    function updateActiveSectionIndicator(scrollPosition) {
        // Offset for each section for Scrolling
        const sectionOffsets = [
            $('#top').offset().top,
            $('#whits-logo').offset().top,
            $('#solution').offset().top - 50,
            $('#results').offset().top,
            $('#slideshow').offset().top - 500
        ];

        // Finds active section based on scroll position
        let activeSection = 0;
        for (let i = 0; i < sectionOffsets.length; i++) {
            if (scrollPosition >= sectionOffsets[i]) {
                activeSection = i;
            }
        }

        // Update active class for section indicators
        $('.section-indicators .indicator').removeClass('active');
        $('.section-indicators .indicator:eq(' + activeSection + ')').addClass('active');
    }
    // End of smooth scroll for navigation links and active section indicators

    // Start of Slideshow Section and Nested Slideshow (Specific for Photography content)
    const categoryContent = {
        video: `
            <div id="media-column">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/g2Xl0Gaaq_4" frameborder="0" allowfullscreen></iframe>
            </div>
            <div id="description-column">
                <p>
                    A 60 second promotional movie<br />
                    trailer played on TV, online as<br />
                    pre rolls and via Facebook, to<br />
                    promote the movie that was<br />
                    waiting to be written to our<br />
                    movie-loving target audience,<br />
                    and encourage them to enter
                </p>
                <button class="slideshow-btn">
                    View Project
                </button>
            </div>`,
        // Nested Slideshow with slide indicators - line 124 to 145
        photography: `
            <div id="media-column">
                <div class="nested-slideshow">
                    <div class="slide">
                        <img src="./images/photography_imgs/img_1.jpg" alt="Image 1">
                    </div>
                    <div class="slide">
                        <img src="./images/photography_imgs/img_2.jpg" alt="Image 2">
                    </div>
                    <div class="slide">
                        <img src="./images/photography_imgs/img_3.jpg" alt="Image 3">
                    </div>
                    <div class="slide">
                        <img src="./images/photography_imgs/img_4.jpg" alt="Image 4">
                    </div>
                </div>
                <div class="sequence-indicators">
                    <div class="indicator"></div>
                    <div class="indicator"></div>
                    <div class="indicator"></div>
                    <div class="indicator"></div>
                </div>
            </div>
            <div id="description-column">
                <p>
                    Shots posted on Facebook and<br />
                    Instagram every day inspired<br />
                    thousands of entries. We reacted<br />
                    to the storyline as it developed in<br />
                    real time, selecting and treating<br />
                    the next image according to the<br />
                    day's winning scene.
                </p>
                <button class="slideshow-btn">
                    View Project
                </button>
            </div>`,
        social: `
            <div id="media-column">
                <img id="storyboard" src="./images/social-media-img.png" alt="Storyboard Image">
            </div>
            <div id="description-column">
                <p>
                    The complete move storyboard<br />
                    showcased the entire story,<br />
                    completely inspired by stunning<br />
                    images captured in the<br />
                    Whitsundays, with all 20 winning<br />
                    scenes accompanying the images<br />
                <p/>
                <button class="slideshow-btn">
                    View Project
                </button>
            </div>`,
        pr: `
            <div id="media-column">
                <img src="./images/pr.png" alt="PR Image">
            </div>
            <div id="description-column">
                <p>
                    We enlisted the help of Craig<br />
                    Pearce as script supervisor, who<br />
                    was tasked with choosing the<br />
                    winner each day to ensure the<br />
                    story flowed properly, and<br />
                    providing dailty writing tips to<br />
                    encourage people to take part.<br />
                </p>
                <button class="slideshow-btn">
                    View Project
                </button>
            </div>`,
        radio: `
            <div class="column">
                <img src="./images/radio.png" alt="Radio Image">
            </div>
            <div class="column">
                <p>
                    Live reads from NOVA presenters<br />
                    reflected the ever-evolving story of Jake<br />
                    in real time, and encouraged people to<br />
                    get involved to shape the story<br />
                    themselves.
                </p>
                <button class="slideshow-btn">
                    View Project
                </button>
            </div>`
    };

    // Function to update slideshow content with fade-in effect
    function updateSlideshowContent(category) {
        $('.category-btn').removeClass('active');
        $(`.category-btn[data-category="${category}"]`).addClass('active');

        // Check if the category is "photography", then update the content
        if (category === 'photography') {
            const content = categoryContent[category];
            $('.slideshow-content').html(content);
            initializeNestedSlideshow(); // Initialize nested slideshow for photography category
        } else {
            // For other categories, update content as before (without the nested slideshow)
            $('.slideshow-content').css('opacity', 0);
            setTimeout(function () {
                const content = categoryContent[category];
                $('.slideshow-content').html(content).css('opacity', 1);
            }, 300);
        }
    }

    // Updates the Slideshow Content based on selected category
    $('.category-btn').on('click', function () {
        const category = $(this).data('category');
        updateSlideshowContent(category);
    });

    // Sets default category to display, not adding a default displays blank
    const defaultCategory = 'video'; // pulled from data-category from category-btn button element
    updateSlideshowContent(defaultCategory);

    function initializeNestedSlideshow() {
        const nestedSlides = $('.nested-slideshow .slide');
        const sequenceIndicators = $('.sequence-indicators .indicator');
        let currentIndex = 0;
        let interval;

        function showSlide(index) {
            // Hide all slides
            nestedSlides.hide();
            // Show the slide at the specified index
            nestedSlides.eq(index).show();

            // Update sequence indicators
            sequenceIndicators.removeClass('active'); // Remove active class from all indicators
            sequenceIndicators.eq(index).addClass('active'); // Add active class to the current indicator
        }

        // Function to navigate to the next slide
        function nextSlide() {
            currentIndex = (currentIndex + 1) % nestedSlides.length;
            showSlide(currentIndex);
        }

        // Automatically move to the next slide every 3 seconds (3000 milliseconds)
        interval = setInterval(nextSlide, 3000);

        // Pause photography slideshow when on mouse hover
        $('.nested-slideshow').hover(
            function () {
                clearInterval(interval); // Pauses slideshow on hover
            },
            function () {
                interval = setInterval(nextSlide, 3000); // Resume slideshow when not hovering
            }
        );

        // Calling showSlide function to display initial slide
        showSlide(currentIndex);
    }

    // Initialize the nested slideshow
    initializeNestedSlideshow();
    // End of Slideshow Section and Nested Slideshow
});
