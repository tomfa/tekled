/* Settings */

var settings = {
   "meta_title" : "TIØ4258 Teknologiledelse - interaktiv eksamen",
   "meta_description": "TIØ4258 Teknologiledelse, interaktive eksamener",
   "meta_author": "Tomas Albertsen Fagerbekk",

   "exam_chooser_header": "Eksamener i TIØ4258",
   "page_header": "Teknologiledelse"
};

/* Setting the settings. jQuery dependant. */

$('title').html(settings.meta_title);
$("meta[name='author']").html(settings.meta_author);
$("meta[name='description']").html(settings.meta_description);
$(".pageheader").html(settings.page_header);
$(".examchooser-header").html(settings.exam_chooser_header);