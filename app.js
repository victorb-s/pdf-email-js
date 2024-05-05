window.onload = function() {
    // Verificamos se a biblioteca jsPDF está definida antes de chamar a função enviarEmail
    if (typeof jsPDF !== 'undefined') {
        window.jsPDF = window.jspdf.jsPDF;
    } else {
        console.log('Erro: jsPDF não foi carregado corretamente.');
    }
};

function enviarEmail(){
    event.preventDefault();

    // Dados de resposta do formulário
    var primeiroNomeUsuario = document.getElementById('firstname').value;
    var ultimoNomeUsuario = document.getElementById('lastname').value;
    var emailUsuario = document.getElementById('email').value;
    var numeroUsuario = document.getElementById('number').value;
    var textoRequisicaoUsuario = document.getElementById('text').value;

    // Criar PDF
    if (typeof jsPDF !== 'undefined') {
        var doc = new jsPDF();
        doc.text(20, 20, 'Primeiro Nome: ' + primeiroNomeUsuario);
        doc.text(20, 30, 'Último Nome: ' + ultimoNomeUsuario);
        doc.text(20, 40, 'Email: ' + emailUsuario);
        doc.text(20, 50, 'Número: ' + numeroUsuario);
        doc.text(20, 60, 'Texto de Requisição: ' + textoRequisicaoUsuario);

        // Salvar PDF
        var pdfData = doc.output('dataurlstring');
        console.log(pdfData);

        //Enviar email com o PDF criado
        var service_id = 'service_gob5pbe'
        var template_id = 'template_58ku18j'
        var user_id = 'POgmQvSYwDFL6qSnC'

        emailjs.init(user_id);
        emailjs.send(service_id, template_id, {
            primeiroNome: primeiroNomeUsuario, 
            ultimoNome: ultimoNomeUsuario, 
            email: emailUsuario, 
            celular: numeroUsuario, 
            descricao: textoRequisicaoUsuario,
            pdfData: pdfData
        }).then(function(response){
            alert('Email enviado com sucesso!', response);
        }, function(error){
            alert('Erro ao enviar email:', error);
        });

    } else {
        console.log('Erro: jsPDF não foi carregado corretamente.');
    }
}