$(function() {
    $(".icon-link").hover(
        function() {
            var $this = $(this);
            $this.find('img').attr('src', $this.data('src-hover'));
        },
        function() {
            var $this = $(this);
            $this.find('img').attr('src', $this.data('src-default'));
        }
    );
});