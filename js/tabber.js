( function ( $ ) {
	$.fn.tabber = function () {
		return this.each( function () {
			// create tabs
			var $this = $( this ),
				tabContent = $this.children( '.tabbertab' ),
				nav = $( '<ul>' ).addClass( 'tabbernav' ),
				loc;

			tabContent.each( function () {
				var anchor = $( '<a>' ).text( this.title ).attr( 'title', this.title ).attr( 'href', '#' );
				$( '<li>' ).append( anchor ).appendTo( nav );

				// Append a manual word break point after each tab
				nav.append( $( '<wbr>' ) );
			} );

			$this.prepend( nav );

			/**
			 * Internal helper function for showing content
			 * @param  {string} title to show, matching only 1 tab
			 * @return {bool} true if matching tab could be shown
			 */
			function showContent( title ) {
				var content = tabContent.filter( '[title="' + title + '"]' );
				if ( content.length !== 1 ) { return false; }
				tabContent.hide();
				content.show();
				nav.find( '.tabberactive' ).removeClass( 'tabberactive' );
				nav.find( 'a[title="' + title + '"]' ).parent().addClass( 'tabberactive' );
				return true;
			}

			// setup initial state
			loc = location.hash.replace( '#', '' );
			if ( loc === '' || !showContent( loc ) ) {
				showContent( tabContent.first().attr( 'title' ) );
			}

			// Respond to clicks on the nav tabs
			nav.on( 'click', 'a', function ( e ) {
				var title = $( this ).attr( 'title' );
				e.preventDefault();
				if ( history.pushState ) {
					history.pushState( null, null, '#' + title );
				} else {
					location.hash = '#' + title;
				}
				showContent( title );
			} );

			$this.addClass( 'tabberlive' );
			
			$('.UsersPagesLinksButtonCounter').on( 'click',function( e ){
				var title =  $( this ).attr( 'title' );
				e.preventDefault();
				if ( history.pushState ) {
					history.pushState( null, null, '#' + title );
				} else {
					location.hash = '#' + title;
				}
				showContent( title );
						
			});
		} );
	};
}( jQuery ) );

$( document ).ready( function () {
	$( '.tabber' ).tabber();
} );
