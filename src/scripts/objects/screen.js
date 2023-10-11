const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info section">
                                            <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                            <div class="data">
                                                <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1>
                                                <p>${user.bio ?? 'Não possui bio cadastrada 😥'}</p>
                                                <div class="counters">
                                                    <div class="follows">
                                                        <h3>👥 Seguidores</h3>
                                                        <span>${user.followers}</span>
                                                    </div>
                                                    <div class="follows">
                                                        <h3>👥 Seguindo</h3>
                                                        <span>${user.following}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`

        if (user.repositories.length > 0) {
            let repositoriesItens = ''
            user.repositories.forEach(repo =>

                repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">
                                            <h4>${repo.name}</h4>
                                            <i>🍴 ${repo.forks_count}</i>
                                            <i>⭐ ${repo.stargazers_count}</i>
                                            <i>👀 ${repo.watchers_count}</i>
                                            <i>👩‍💻 ${repo.language ?? 'Sem linguagem'}</i>
                                        </a></li>`)

            this.userProfile.innerHTML += `<div class="repositories section">
                                            <h2>Repositórios</h2>
                                            <ul>${repositoriesItens}</ul>
                                           </div>`                                 
        }

        if (user.events.length > 0) {
            let eventsItens = ''
            user.events.forEach(element => {
                if(element.type === 'PushEvent') {
                    eventsItens += `<li>
                <h3><strong>${element.repo.name}</strong></h3>
                <p> -- ${element.payload.commits[0].message}</p>
                </li>`
                }else{
                    eventsItens += `<li>
                    <h3><strong>${element.repo.name}</strong></h3>
                    <p> -- Criado um ${element.payload.ref_type}</p>
                    </li>`
                };
            });

            this.userProfile.innerHTML += `<div class="events section">
                                            <h2>Atividades</h2>
                                            <ul>${eventsItens}</ul>
                                           </div>`                                 
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }
