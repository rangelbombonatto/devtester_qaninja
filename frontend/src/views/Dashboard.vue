<template>
  <div class="dashboard">
    <Navbar/>
    <div class="container">
      <!-- Main container -->
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <h4 class="title is-4">Seu gerenciador digital de contatos</h4>
          </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <div class="level-item">
            <button
              id="addNewContact"
              class="button is-success"
              @click="showContactAddModal = true"
            >
              +
            </button>
          </div>
          <div class="level-item">
            <div class="field has-addons">
              <p class="control">
                <input
                  class="input"
                  type="text"
                  v-model="searchInput"
                  placeholder="Número do Whats"
                />
              </p>
              <p class="control">
                <button class="button is-primary" @click="search">
                  Buscar
                </button>
              </p>
            </div>
          </div>
        </div>
      </nav>

      <div id="loader" v-if="isLoading === true">
        <img src="../assets/loading.gif" alt="Loader" />
      </div>

      <article class="message is-danger" v-if="contactList.length === 0">
        <div class="message-body">
          Contato não encontrado. :(
        </div>
      </article>

      <div class="contact-list columns is-multiline" v-if="isLoading === false">
        <div
          class="column is-4"
          v-for="contact in contactList"
          :key="contact._id">
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img src="../assets/whatsapp.svg" alt="Logo WhatsApp" />
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">{{ contact.name }}</p>
                  <p class="subtitle is-6">{{ contact.number }}</p>
                </div>
              </div>

              <div class="content">
                {{ contact.description }}
              </div>
            </div>
            <footer class="card-footer">
              <a :href="zaplink(contact.number)" class="card-footer-item">Conversar</a>
              <a href="#" class="card-footer-item btn-remove" @click="remove(contact._id)">Apagar</a>
            </footer>
          </div>
        </div>
      </div>

      <b-modal
        v-model="showContactAddModal"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-label="Example Modal"
        aria-modal>
        <form action="">
          <div class="modal-card" style="width: 450px">
            <header class="modal-card-head">
              <p class="modal-card-title">Novo Contato</p>
              <button
                type="button"
                class="delete"
                @click="showContactAddModal = false"/>
            </header>
            <section class="modal-card-body">
              <div class="field input-name">
                <input
                  class="input is-primary"
                  v-model="form.name"
                  placeholder="Nome completo"/>
                <small class="has-text-danger" v-if="errorName === true"
                  >Nome é obrigatório.</small>
              </div>

              <div class="field input-number">
                <input
                  class="input is-primary"
                  v-model="form.number"
                  placeholder="WhatsApp"/>
                <small class="has-text-danger" v-if="errorNumber === true">WhatsApp é obrigatório.</small>
              </div>

              <div class="field text-description">
                <textarea
                  class="textarea is-primary"
                  v-model="form.description"
                  placeholder="Assunto"></textarea>
                <small class="has-text-danger" v-if="errorDescription === true">Assunto é obrigatório.</small>
              </div>
            </section>
            <footer class="modal-card-foot">
              <button
                id="saveButton"
                type="button"
                class="button is-success"
                @click="create">
                Cadastrar
              </button>
            </footer>
          </div>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'




export default {
  name: "Dashboard",
  components: {Navbar},
  data() {
    return {
      isLoading: false,
      contactList: [],
      showContactAddModal: false,
      errorName: false,
      errorNumber: false,
      errorDescription: false,
      searchInput: "",

      form: {
        name: "",
        number: "",
        description: "",
      },
    };
  },



  methods: {
    zaplink(number) {
      return `https://api.whatsapp.com/send?phone=55${number}`
    },

    search() {
      this.isLoading = true;
      if (this.searchInput != "") {
        this.contactList = this.contactList.filter(
          (contact) => contact.number === this.searchInput
        );
        this.isLoading = false;
      } else {
        this.list();
      }
    },
    create() {
      this.errorName = false;
      this.errorNumber = false;
      this.errorDescription = false;

      if (this.form.name === "") {
        this.errorName = true;
      }

      if (this.form.number === "") {
        this.errorNumber = true;
      }

      if (this.form.description === "") {
        this.errorDescription = true;
      }

      if (
        this.errorName === false &&
        this.errorNumber === false &&
        this.errorDescription === false
      ) {
        window.axios.post("/contacts", this.form).then(async (res) => {
          await res.data;
          this.showContactAddModal = false;
          this.list();
        });
      }
    },
    remove(contactId) {
      window.axios.delete('/contacts/' + contactId).then(async (res) => {
        await res.data
        this.list()
      })
    },

    list() {
      this.isLoading = true;
      window.axios.get("/contacts").then(async (res) => {
        this.contactList = await res.data;
        this.isLoading = false;
      });
    },
  },
  mounted() {
    // esse metodo é executado toda vez que carrega a página
    this.list();
  },
};
</script>
