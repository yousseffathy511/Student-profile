/*
 * Student Portfolio Website Scripts
 * Features: Form Validation, Project Filtering, Animations, Smooth Scroll
 */

$(document).ready(function () {

    // --- 1. Navbar Scroll Effect ---
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('shadow-sm').css('padding', '10px 0');
        } else {
            $('.navbar').removeClass('shadow-sm').css('padding', '15px 0');
        }

        // Show/Hide Back to Top Button
        if ($(this).scrollTop() > 300) {
            $('#backToTop').fadeIn();
        } else {
            $('#backToTop').fadeOut();
        }

        // Animate Skill Bars on Scroll
        animateSkills();
    });

    // --- 2. Smooth Scrolling & Back to Top ---
    // Back to Top Button
    $('#backToTop').on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 400);
    });

    // Smooth Scrolling for Nav Links
    $('a.nav-link, .btn-outline-light').on('click', function (event) {
        // Only trigger smooth scroll if the link is for the current page
        if (this.hash !== "" &&
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 400);
            }
        }
    });

    // --- 3. Skill Bar Animation ---
    function animateSkills() {
        var skillsSection = $('#skills');
        if (skillsSection.length) {
            var top_of_element = skillsSection.offset().top;
            var bottom_of_element = skillsSection.offset().top + skillsSection.outerHeight();
            var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
            var top_of_screen = $(window).scrollTop();

            if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)) {
                $('.progress-bar').each(function () {
                    var width = $(this).data('width');
                    $(this).css('width', width);
                });
            }
        }
    }

    // --- 4. Project Filtering (Projects Page) ---
    $('.filter-btn').click(function () {
        var value = $(this).data('filter');

        // Active Class Toggle
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');

        if (value == 'all') {
            $('.project-item').show();
        } else {
            $('.project-item').each(function() {
                if ($(this).data('category') === value) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }
    });

    // --- 5. Modal Data Population ---
    var currentVideo = '';
    
    $('.view-details-btn').click(function () {
        var title = $(this).data('title');
        var desc = $(this).data('desc');
        var img = $(this).data('img');
        var img2 = $(this).data('img2');
        var img3 = $(this).data('img3');
        var tech = $(this).data('tech');
        currentVideo = $(this).data('video');

        $('#modalTitle').text(title);
        $('#modalDesc').text(desc);
        $('#modalImg1').attr('src', img);
        $('#modalImg2').attr('src', img2);
        $('#modalImg3').attr('src', img3);

        // Update technologies
        if (tech) {
            var techArray = tech.split(',');
            var techHtml = '';
            techArray.forEach(function(technology) {
                techHtml += '<span class="badge">' + technology.trim() + '</span>';
            });
            $('#modalTech').html(techHtml);
        }
    });

    // --- 6. Live Demo Video ---
    $('#liveDemoBtn').click(function() {
        if (currentVideo) {
            $('#videoModalTitle').text($('#modalTitle').text() + ' - Live Demo');
            $('#demoVideo source').attr('src', currentVideo);
            $('#demoVideo')[0].load();
            $('#projectModal').modal('hide');
            $('#videoModal').modal('show');
            // Autoplay after modal is shown
            $('#videoModal').on('shown.bs.modal', function () {
                $('#demoVideo')[0].play();
            });
        }
    });

    // Stop video when modal closes
    $('#videoModal').on('hidden.bs.modal', function () {
        $('#demoVideo')[0].pause();
        $('#demoVideo')[0].currentTime = 0;
    });

    // --- 7. Form Validation ---
    $('#contactForm').submit(function (event) {
        event.preventDefault(); // Prevent actual submission
        event.stopPropagation();

        var isValid = true;

        // Name Validation
        var name = $('#name').val().trim();
        if (name.length < 3) {
            $('#name').addClass('is-invalid');
            isValid = false;
        } else {
            $('#name').removeClass('is-invalid').addClass('is-valid');
        }

        // Email Validation
        var email = $('#email').val().trim();
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            $('#email').addClass('is-invalid');
            isValid = false;
        } else {
            $('#email').removeClass('is-invalid').addClass('is-valid');
        }

        // Subject Validation
        var subject = $('#subject').val().trim();
        if (subject === "") {
            $('#subject').addClass('is-invalid');
            isValid = false;
        } else {
            $('#subject').removeClass('is-invalid').addClass('is-valid');
        }

        // Message Validation
        var message = $('#message').val().trim();
        if (message.length < 10) {
            $('#message').addClass('is-invalid');
            isValid = false;
        } else {
            $('#message').removeClass('is-invalid').addClass('is-valid');
        }

        if (isValid) {
            // Simulate success
            $('#formSuccess').removeClass('d-none').fadeIn();
            $('#contactForm')[0].reset();
            $('.form-control').removeClass('is-valid');

            // Hide success message after 5 seconds
            setTimeout(function () {
                $('#formSuccess').fadeOut();
            }, 5000);
        }
    });

    // Clear validation state on input
    $('.form-control').on('input', function () {
        $(this).removeClass('is-invalid');
    });

});
