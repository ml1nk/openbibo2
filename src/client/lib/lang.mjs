import i18next from 'i18next';
import plugin from 'jquery-i18next';
import $ from 'jquery';
import de from './../lang/de.json';


export default () => {
  i18next.init({
    lng: 'de',
    resources: {
      de: {
          translation: de,
      },
    },
  });
  plugin.init(i18next, $);
};

// document.title = i18next.t('title');
