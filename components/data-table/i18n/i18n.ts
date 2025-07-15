/**
 * @module i18n
 * @description
 * Internationalization (i18n) module for Tiptap Editor.
 * Provides multi-language support for UI labels, messages, and commands.
 * Supports Turkish, English, German, French, and Spanish.
 *
 * @example
 * ```typescript
 * import { i18n } from './i18n';
 * i18n.setLanguage('en');
 * const label = i18n.t('BOLD'); // Returns 'Bold' if language is English
 * ```
 */

/**
 * Supported language codes.
 * @typedef {'tr' | 'en' | 'de' | 'fr' | 'es'} Language
 */

/**
 * Translation dictionary type.
 * Each key maps to an object containing translations for all supported languages.
 */

type Language = 'tr' | 'en' | 'de' | 'fr' | 'es';

/**
 * Translation dictionary for all UI labels and messages.
 * Keys are used throughout the editor for multi-language support.
 */

interface Translations {
   [key: string]: {
      [K in Language]: string;
   };
}

const translations: Translations = {
   DELETE_ROW: {
      tr: 'Satırı Sil',
      en: 'Delete Row',
      de: 'Zeile löschen',
      fr: 'Supprimer la ligne',
      es: 'Eliminar fila',
   },
   MORE: {
      tr: 'Daha Fazla',
      en: 'More',
      de: 'Mehr',
      fr: 'Plus',
      es: 'Más',
   },
   COPY_TO_CLIPBOARD: {
      tr: 'Panoya Kopyala',
      en: 'Copy to Clipboard',
      de: 'In die Zwischenablage kopieren',
      fr: 'Copier dans le presse-papiers',
      es: 'Copiar al portapapeles',
   },
   CANCEL: {
      tr: 'İptal',
      en: 'Cancel',
      de: 'Abbrechen',
      fr: 'Annuler',
      es: 'Cancelar',
   },
   DELETE: {
      tr: 'Sil',
      en: 'Delete',
      de: 'Löschen',
      fr: 'Supprimer',
      es: 'Eliminar',
   },
   CONFIRM_DELETE_TITLE: {
      tr: 'Bu {target} kalıcı olarak silecektir. Devam etmek istediğinize emin misiniz?',
      en: 'This will permanently delete {target}. Are you sure you want to proceed?',
      de: 'Dies wird {target} dauerhaft löschen. Sind Sie sicher, dass Sie fortfahren möchten?',
      fr: 'Cela supprimera définitivement {target}. Êtes-vous sûr de vouloir continuer ?',
      es: 'Esto eliminará permanentemente {target}. ¿Estás seguro de que quieres continuar?',
   },
   CONFIRM_DELETE_DESC: {
      tr: 'Bu {target} kalıcı olarak silecektir. Bu işlemi geri alamayacaksınız.',
      en: "Are you sure you want to delete {target}? You won't be able to undo this action.",
      de: 'Sind Sie sicher, dass Sie {target} löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
      fr: 'Êtes-vous sûr de vouloir supprimer {target} ? Vous ne pourrez pas annuler cette action.',
      es: '¿Estás seguro de que quieres eliminar {target}? No podrás deshacer esta acción.',
   },
   ALL_SELECTED_ROWS: {
      tr: 'tüm seçili satırlar',
      en: 'all selected rows',
      de: 'alle ausgewählten Zeilen',
      fr: 'toutes les lignes sélectionnées',
      es: 'todas las filas seleccionadas',
   },
   SELECTED_ROW: {
      tr: 'seçili satır',
      en: 'the selected row',
      de: 'die ausgewählte Zeile',
      fr: 'la ligne sélectionnée',
      es: 'la fila seleccionada',
   },
   ADD_ROW: {
      tr: 'Satır Ekle',
      en: 'Add Row',
      de: 'Zeile hinzufügen',
      fr: 'Ajouter une ligne',
      es: 'Agregar fila',
   },
   EDIT_ROW: {
      tr: 'Satırı Düzenle',
      en: 'Edit Row',
      de: 'Zeile bearbeiten',
      fr: 'Modifier la ligne',
      es: 'Editar fila',
   },
   EXPORT: {
      tr: 'Dışa Aktar',
      en: 'Export',
      de: 'Exportieren',
      fr: 'Exporter',
      es: 'Exportar',
   },
   CLEAR_FILTERS: {
      tr: 'Filtreleri Temizle',
      en: 'Clear Filters',
      de: 'Filter zurücksetzen',
      fr: 'Effacer les filtres',
      es: 'Limpiar filtros',
   },
   CLEAR_SELECTION: {
      tr: 'Seçimi Temizle',
      en: 'Clear Selection',
      de: 'Auswahl aufheben',
      fr: 'Effacer la sélection',
      es: 'Limpiar selección',
   },
   DELETE_CURRENT_ROWS: {
      tr: 'Geçerli Satırları Sil',
      en: 'Delete Current Rows',
      de: 'Aktuelle Zeilen löschen',
      fr: 'Supprimer les lignes actuelles',
      es: 'Eliminar filas actuales',
   },
   EXPORT_CURRENT_ROWS: {
      tr: 'Geçerli Satırları Dışa Aktar',
      en: 'Export Current Rows',
      de: 'Aktuelle Zeilen exportieren',
      fr: 'Exporter les lignes actuelles',
      es: 'Exportar filas actuales',
   },
   CREATE_NEW: {
      tr: 'Yeni Oluştur',
      en: 'Create New',
      de: 'Neu erstellen',
      fr: 'Créer nouveau',
      es: 'Crear nuevo',
   },
   VIEW: {
      tr: 'Görünüm',
      en: 'View',
      de: 'Ansicht',
      fr: 'Vue',
      es: 'Ver',
   },
   FILTER_ANYTHING: {
      tr: 'Herhangi bir şeyi filtrele',
      en: 'Filter anything',
      de: 'Alles filtern',
      fr: 'Filtrer n’importe quoi',
      es: 'Filtrar cualquier cosa',
   },
   ALL: {
      tr: 'Tümü',
      en: 'All',
      de: 'Alle',
      fr: 'Tous',
      es: 'Todos',
   },
   SEARCH: {
      tr: 'Ara',
      en: 'Search',
      de: 'Suche',
      fr: 'Rechercher',
      es: 'Buscar',
   },
   REARRANGE_THIS_COLUMN: {
      tr: 'Bu sütunu yeniden düzenle',
      en: 'Rearrange this column',
      de: 'Diese Spalte neu anordnen',
      fr: 'Réorganiser cette colonne',
      es: 'Reorganizar esta columna',
   },
   SORT_ROWS_BY_THIS_COLUMN: {
      tr: 'Satırları bu sütuna göre sırala',
      en: 'Sort rows by this column',
      de: 'Zeilen nach dieser Spalte sortieren',
      fr: 'Trier les lignes par cette colonne',
      es: 'Ordenar filas por esta columna',
   },
   FILTER_ROWS_BY_THIS_COLUMN: {
      tr: 'Satırları bu sütuna göre filtrele',
      en: 'Filter rows by this column',
      de: 'Zeilen nach dieser Spalte filtern',
      fr: 'Filtrer les lignes par cette colonne',
      es: 'Filtrar filas por esta columna',
   },
   UNPIN: {
      tr: 'Sabitlenmeyi Kaldır',
      en: 'Unpin',
      de: 'Anheften aufheben',
      fr: 'Détacher',
      es: 'Desanclar',
   },
   PINLEFT: {
      tr: 'Sola Sabitle',
      en: 'Pin Left',
      de: 'Links anheften',
      fr: 'Épingler à gauche',
      es: 'Anclar a la izquierda',
   },
   PINRIGHT: {
      tr: 'Sağa Sabitle',
      en: 'Pin Right',
      de: 'Rechts anheften',
      fr: 'Épingler à droite',
      es: 'Anclar a la derecha',
   },
   UNPIN_THIS_COLUMN: {
      tr: 'Bu sütunun sabitlenmesini kaldır',
      en: 'Unpin this column',
      de: 'Diese Spalte nicht mehr anheften',
      fr: 'Détacher cette colonne',
      es: 'Desanclar esta columna',
   },
   PIN_THIS_COLUMN: {
      tr: 'Bu sütunu sabitle',
      en: 'Pin this column',
      de: 'Diese Spalte anheften',
      fr: 'Épingler cette colonne',
      es: 'Anclar esta columna',
   },
   SORTDESCENDING: {
      tr: 'Azalan Sırala',
      en: 'Sort Descending',
      de: 'Absteigend sortieren',
      fr: 'Trier par ordre décroissant',
      es: 'Ordenar de forma descendente',
   },
   SORTASCENDING: {
      tr: 'Artan Sırala',
      en: 'Sort Ascending',
      de: 'Aufsteigend sortieren',
      fr: 'Trier par ordre croissant',
      es: 'Ordenar de forma ascendente',
   },
   CLEAR_SORT: {
      tr: 'Sıralamayı Temizle',
      en: 'Clear Sort',
      de: 'Sortierung zurücksetzen',
      fr: 'Effacer le tri',
      es: 'Limpiar ordenamiento',
   },
   HIDE: {
      tr: 'Gizle',
      en: 'Hide',
      de: 'Ausblenden',
      fr: 'Masquer',
      es: 'Ocultar',
   },
   SHOW: {
      tr: 'Göster',
      en: 'Show',
      de: 'Anzeigen',
      fr: 'Afficher',
      es: 'Mostrar',
   },
   COLUMN_FILTER: {
      tr: 'Sütun Filtresi',
      en: 'Column Filter',
      de: 'Spaltenfilter',
      fr: 'Filtre de colonne',
      es: 'Filtro de columna',
   },
   COLUMN_FILTER_DESC: {
      tr: 'Filtre sadece geçerli sütuna uygulanacaktır.',
      en: 'Filter will be applied to current column only.',
      de: 'Filter wird nur auf die aktuelle Spalte angewendet.',
      fr: "Le filtre ne sera appliqué qu'à la colonne actuelle.",
      es: 'El filtro se aplicará solo a la columna actual.',
   },
   SELECTED_ROWS_COUNT: {
      tr: '{selected} / {total} satır seçildi.',
      en: '{selected} of {total} row(s) selected.',
      de: '{selected} von {total} Zeile(n) ausgewählt.',
      fr: '{selected} sur {total} ligne(s) sélectionnée(s).',
      es: '{selected} de {total} fila(s) seleccionada(s).',
   },
   ROWS_PER_PAGE: {
      tr: 'Sayfa başına satır',
      en: 'Rows per page',
      de: 'Zeilen pro Seite',
      fr: 'Lignes par page',
      es: 'Filas por página',
   },
   PAGE_OF: {
      tr: 'Sayfa {page} / {total}',
      en: 'Page {page} of {total}',
      de: 'Seite {page} von {total}',
      fr: 'Page {page} sur {total}',
      es: 'Página {page} de {total}',
   },
   RESET_ROWS: {
      tr: 'Satırları Sıfırla',
      en: 'Reset Rows',
      de: 'Zeilen zurücksetzen',
      fr: 'Réinitialiser les lignes',
      es: 'Restablecer filas',
   },
   SELECT_ROWS: {
      tr: 'Satırları Seç',
      en: 'Select Rows',
      de: 'Zeilen auswählen',
      fr: 'Sélectionner les lignes',
      es: 'Seleccionar filas',
   },
   IN_RANGE_OF: {
      tr: '{{field}} Aralığında ( {{range}} )',
      en: '{{field}} In Range Of ( {{range}} )',
      de: '{{field}} Im Bereich von ( {{range}} )',
      fr: '{{field}} Dans la plage de ( {{range}} )',
      es: '{{field}} En el rango de ( {{range}} )',
   },
   EQUALS_OR_CONTAINS: {
      tr: '{field} Eşittir/İçerir {value}',
      en: '{field} Equals/Contains {value}',
      de: "{field} Entspricht/Enthält {value}'",
      fr: '{field} Égal/Contient {value}',
      es: '{field} Igual/Contiene {value}',
   },
   IS_BETWEEN: {
      tr: '{field} Arasında ( {from} - {to} )',
      en: '{field} Is Between ( {from} - {to} )',
      de: '{field} Liegt zwischen ( {from} - {to} )',
      fr: '{field} Est entre ( {from} - {to} )',
      es: '{field} Está entre ( {from} - {to} )',
   },
   NOW: {
      tr: 'Şimdi',
      en: 'Now',
      de: 'Jetzt',
      fr: 'Maintenant',
      es: 'Ahora',
   },
};

/**
 * Internationalization class for managing language and translations.
 */
class I18n {
   /**
    * Current language code.
    * @private
    */
   private currentLanguage: Language = 'tr';

   /**
    * Sets the current language.
    * @param lang - Language code to set (e.g. 'en', 'tr').
    */
   setLanguage(lang: Language) {
      this.currentLanguage = lang;
   }

   /**
    * Gets the current language code.
    * @returns Current language code.
    */
   getCurrentLanguage(): Language {
      return this.currentLanguage;
   }

   /**
    * Returns the translation for a given key in the current language.
    * Falls back to English or the key itself if not found.
    * @param key - Translation key.
    * @param fallback - Optional fallback string.
    * @returns Translated string.
    */
   t(key: string, fallback?: string): string {
      const translation = translations[key];
      if (!translation) {
         return fallback || key;
      }
      return translation[this.currentLanguage] || translation['en'] || fallback || key;
   }

   /**
    * Returns all translations for a key as lowercase search terms.
    * Useful for multi-language search/filter.
    * @param key - Translation key.
    * @returns Array of search terms in all supported languages.
    */
   getSearchTerms(key: string): string[] {
      const translation = translations[key];
      if (!translation) return [];
      return Object.values(translation).map((term) => term.toLowerCase());
   }
}

/**
 * Singleton instance of the i18n class.
 */
export const i18n = new I18n();
export type { Language };
