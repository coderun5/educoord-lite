// Dados iniciais
let professores = JSON.parse(localStorage.getItem('professores')) || [];
let alunos = JSON.parse(localStorage.getItem('alunos')) || [];
let planos = JSON.parse(localStorage.getItem('planos')) || [];
let notas = JSON.parse(localStorage.getItem('notas')) || [];

// Navegação
document.querySelectorAll('[data-section]').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('d-none');
        });
        document.getElementById(btn.dataset.section).classList.remove('d-none');
    });
});

// Funções para Professores
function carregarProfessores() {
    const tbody = document.getElementById('tabelaProfessores');
    tbody.innerHTML = professores.map(prof => `
        <tr>
            <td>${prof.nome}</td>
            <td>${prof.disciplina}</td>
            <td>${prof.email}</td>
        </tr>
    `).join('');
}

// Funções para Alunos (similares às de professores)

// Funções para Planos de Aula
function carregarPlanos() {
    const div = document.getElementById('listaPlanos');
    div.innerHTML = planos.map(plano => `
        <div class="col-md-4 mb-3">
            <div class="card">
                <div class="card-body">
                    <h5>${plano.titulo}</h5>
                    <p>${plano.disciplina}</p>
                    <a href="${plano.arquivo}" target="_blank" class="btn btn-sm btn-secondary">Ver PDF</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Funções para Notas e Gráficos
let chart;
function atualizarGrafico() {
    if (chart) chart.destroy();
    const ctx = document.getElementById('graficoNotas').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: notas.map(n => n.disciplina),
            datasets: [{
                label: 'Notas',
                data: notas.map(n => n.valor),
                borderColor: '#4e73df'
            }]
        }
    });
}

// Eventos e Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarProfessores();
    carregarAlunos();
    carregarPlanos();
    atualizarGrafico();
});

// Salvar dados no localStorage
window.addEventListener('beforeunload', () => {
    localStorage.setItem('professores', JSON.stringify(professores));
    localStorage.setItem('alunos', JSON.stringify(alunos));
    localStorage.setItem('planos', JSON.stringify(planos));
    localStorage.setItem('notas', JSON.stringify(notas));
});
