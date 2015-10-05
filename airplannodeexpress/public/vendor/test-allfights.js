suite('All Flights Page Tests' , function(){
    test('page should contain link to contact page' , function(){
        assert($('a[href="/flights"]' ).length);

    });
});