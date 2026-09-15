const SUPABASE_URL = 'https://etmucxjxoljxknfxigxj.supabase.co';   
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0bXVjeGp4b2xqeGtuZnhpZ3hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0MjYxMzYsImV4cCI6MjEwNTAwMjEzNn0.YSXOLNYSVvy8RCPYVcl6jalEzEm6eeDSSAV2gnS0ea0';         
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function cadastrarUsuario(nome_usuario, senha) {
    try {
        const { data, error } = await supabaseClient
            .from('tb_usuarios')
            .insert([{ nome_usuario, senha }])
            .select();

        if (error) throw error;
        console.log('Usuário cadastrado com sucesso', data);
        return { sucesso: true, dados: data };
    } catch (error) {
        console.error('Erro ao cadastrar', error.message);
        return { sucesso: false, erro: error.message };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastroForm');
    const mensagem = document.getElementById('mensagem');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); 

        const nome = document.getElementById('nome').value.trim();
        const senha = document.getElementById('senha').value.trim();

        if (!nome || !senha) {
            mensagem.textContent = 'Preencha todos os campos!';
            mensagem.style.color = 'red';
            return;
        }

        const btn = form.querySelector('button');
        btn.disabled = true;
        btn.textContent = 'Cadastrando...';

        const resultado = await cadastrarUsuario(nome, senha);

        if (resultado.sucesso) {
            mensagem.textContent = 'Usuário cadastrado com sucesso!';
            mensagem.style.color = 'green';
            form.reset(); 
        } else {
            mensagem.textContent = 'Erro: ' + resultado.erro;
            mensagem.style.color = 'red';
        }

        btn.disabled = false;
        btn.textContent = 'Cadastrar';
    });
});