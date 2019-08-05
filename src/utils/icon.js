

var getIcon = function (icon) {

    const icons = {
        '01d': 'icon-2.svg',
        '02d': 'icon-3.svg',
        '03d': 'icon-5.svg',
        '04d': 'icon-5.svg',
        '09d': 'icon-9.svg',
        '10d': 'icon-9.svg',
        '11d': 'icon-11.svg',
        '13d': 'icon-13.svg',
        '50d': 'icon-8.svg',
        '01n': 'icon-2.svg',
        '02n': 'icon-3.svg',
        '03n': 'icon-5.svg',
        '04n': 'icon-5.svg',
        '09n': 'icon-9.svg',
        '10n': 'icon-9.svg',
        '11n': 'icon-11.svg',
        '13n': 'icon-13.svg',
        '50n': 'icon-8.svg',

    }

    return icons[icon];

}



exports.getIcon = getIcon;