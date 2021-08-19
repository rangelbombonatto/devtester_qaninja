<template>
  <div class="container">
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="columns">
          <div class="column is-6 custom-center">
            <img src="../assets/logo.svg" alt="Logo" />
            <h1 class="title is-4">Seu gerenciador de contatos rápidos</h1>

            <div class="card login">
              <div class="card-content">
                <form>
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <input
                        name="email"
                        class="input"
                        v-model="form.email"
                        type="email"
                        placeholder="Seu email"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                      </span>
                      <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left">
                      <input
                        name="password"
                        class="input"
                        v-model="form.password"
                        type="password"
                        placeholder="Sua senha"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                      </span>
                    </p>
                  </div>
                  <article v-if="alertError" class="message is-danger">
                    <div class="message-body">
                      {{alertError}}
                    </div>
                  </article>

                  <div class="field">
                    <p class="control">
                      <button
                        id="sigIn"
                        type="button"
                        @click="login()"
                        class="button is-success"
                      >
                        Entrar
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="column is-6">
            <img src="../assets/landing.svg" alt="Marca" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      alertError: '',
      form: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    login() {

      if (this.form.email === '') {
        this.alertError = 'Oops. Por favor informe o seu email!'
        return null
      }
        

      if (this.form.password === '') {
        this.alertError = 'Oops. Por favor informe a sua senha!'
        return null
      }
        
      
      window.axios
        .post("/session", this.form)
        .then(async (res) => {
          const resp = await res.data;
          localStorage.setItem("user_token", resp.user_token);
          this.$router.push("/dashboard");
      })
      .catch((error) => {
        this.alertError = 'E-mail e/ou senha inválidos!'
      })
    },
  },
};
</script>


<style scoped>
.login {
  width: 400px;
  border-radius: 10px;
}

.custom-center {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
}
</style>