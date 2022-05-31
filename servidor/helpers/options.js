module.exports = {
    formate: 'letter',
    orientation: 'portrait',
    border: '6mm',
    header: {
        height: '0mm',
        contents: ''
    },
    footer: {
        height: '20mm',
        contents: {
            first: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5',
            default: '<span style="color: #444;" align="right">{{page}}</span>/<span>{{pages}}</span>', 
            /*last: 'Last Page'*/
        }
    }
}