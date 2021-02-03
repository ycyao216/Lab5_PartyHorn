// main.js

// TODO
const SOUND_DIR = "./assets/media/audio/";
const IMAGE_DIR = "./assets/media/images/"
const ICONS_DIR = "./assets/media/icons/";
const VOLUME_LEVEL_NAME = 'volume-level-';
const VOLUME_LEVEL_NUMBER = 33;

var volume = document.getElementById('volume-number');
var volume_number;
var audio_source = document.getElementById('horn-sound');
var volume_slider = document.getElementById('volume-slider');
var audio_select = document.getElementById('party-horn-form');
var play_button = document.getElementById('honk-btn');
var audio_image = document.getElementById('sound-image');
var volume_icon = document.getElementById('volume-image');
var audio_selected = document.querySelectorAll('input[type="radio"]');
var audio_select_field = document.getElementById('audio-selection');

play_button.addEventListener("click", get_selected_audio);
audio_select_field.addEventListener("change", update_audio);

function update_audio() {
    let sound_name, image_name;
    for (const elements of audio_selected) {
        if (elements.checked) {
            sound_name = elements.id.toString();
            if (sound_name.search("air") != -1) {
                sound_name = SOUND_DIR + "air-horn.mp3";
                image_name = IMAGE_DIR + "air-horn.svg";
            }
            else if (sound_name.search("car") != -1) {
                sound_name = SOUND_DIR + "car-horn.mp3";
                image_name = IMAGE_DIR + "car.svg";

            }
            else if (sound_name.search("party") != -1) {
                sound_name = SOUND_DIR + "party-horn.mp3";
                image_name = IMAGE_DIR + "party-horn.svg";

            }
        }
    }
    audio_image.setAttribute("src", image_name);
    audio_source.setAttribute("src", sound_name);
}

function update_volume() {
    let icon_name = (Math.trunc((volume_number + VOLUME_LEVEL_NUMBER - 1) / VOLUME_LEVEL_NUMBER)).toString();
    if (volume_number === 100) {
        icon_name = '3';
    }
    if (volume_number === 0) {
        play_button.disabled = true;
    }
    else {
        play_button.disabled = false;
    }
    volume_icon.setAttribute("src", ICONS_DIR + VOLUME_LEVEL_NAME + icon_name + ".svg");
}

function get_selected_audio(event) {
    event.preventDefault();
    audio_source.play();
}

function text_set_volume() {
    volume_number = parseFloat(volume.value);
    volume_slider.value = volume_number;
    audio_source.volume = volume_number / 100;
    update_volume();
}

function slide_set_volume() {
    volume_number = parseFloat(volume_slider.value);
    volume.value = volume_number;
    audio_source.volume = volume_number / 100;
    update_volume();
}

volume.addEventListener("change", text_set_volume);
volume_slider.addEventListener("mousemove", slide_set_volume)
volume_slider.addEventListener("change", slide_set_volume);

//If submit is used, a 404 error is produced, and there is no form to submit to server
// play_button.setAttribute("type", "button");



