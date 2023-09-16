<template>
  <div data-app>
    <v-card>
      <v-card-title>
        <v-text-field class="col-10" label="Buscar" v-model="search" single-line hide-details></v-text-field>
        <v-btn v-b-modal.modal-new class="col-2 btn btn-success">
          Adicionar
        </v-btn>
      </v-card-title>
      <v-data-table :headers="headers" :items="productList" :search="search">
        <template v-slot:item="row">
          <tr>
            <td>{{ row.item.id }}</td>
            <td>{{ row.item.name }}</td>
            <td>{{ row.item.description }}</td>
            <td>R$ {{ formatPrice(row.item.amount.toString()) }}</td>
            <td>
              <v-btn class="mx-2" fab small v-b-tooltip.hover title="Editar registro" v-b-modal.modal-edit @click="find(row.item.id)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </td>
            <td>
              <v-btn class="mx-2" fab small v-b-tooltip.hover title="Excluir registro" @click="deleteById(row.item.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <b-modal id="modal-new" title="Novo Produto" @cancel="defaultValue" @ok="create(product)">
      <v-text-field label="Nome" maxlength="50" v-model="product.name"></v-text-field>
      <v-text-field label="Descrição" maxlength="250" v-model="product.description"></v-text-field>
      <v-currency-field label="Valor (R$)" v-model="product.amount"></v-currency-field>
    </b-modal>
    <b-modal id="modal-edit" title="Editar produto" @ok="update(edit)">
      <v-text-field label="Nome" maxlength="50" v-model="edit.name"></v-text-field>
      <v-text-field label="Descrição" maxlength="250" v-model="edit.description"></v-text-field>
      <v-currency-field label="Valor (R$)" v-model="edit.amount"></v-currency-field>
    </b-modal>
  </div>
</template>

<script>
import { findAll, findById, removeById, saveOrUpdate } from '../service/productService'

export default {
  name: 'ProductList',

  data: () => ({
    search: "",
    productList: [],
    headers: [
      { text: "ID", filterable: true, value: "id" },
      { text: "NOME", filterable: true, value: "name" },
      { text: "DESCRIÇÃO", filterable: true, value: "description" },
      { text: "VALOR", filterable: true, value: "amount" },
    ],
    product: {},
    edit: {}
  }),

  mounted(){
    this.findAll()
  },

  methods: {
    defaultValue(){
      this.product = {}
    },
    create(){
      if(!this.validate(this.product)){
        return
      }
      saveOrUpdate(this.product).then(()=> {
        this.findAll()
        this.$swal("Sucesso", "Produto inserido com sucesso!", "success");
      }).catch((e)=> {
        this.$swal("Opss...", "Erro: " + e, "error");
      })
      this.defaultValue()
    },
    update(){
      if(!this.validate(this.edit)){
        return
      }
      saveOrUpdate(this.edit).then(()=> {
        this.findAll()
        this.$swal("Sucesso", "Produto atualizado com sucesso!", "success");
      }).catch((e)=> {
        this.$swal("Opss...", "Erro: " + e, "error");
      })
    },
    find(id){
      findById(id).then(result => {
        this.edit = result.data
      })
    },
    deleteById(id){
      removeById(id).then(()=> {
        this.findAll()
        this.$swal("Sucesso", "Produto removido com sucesso!", "success");
      }).catch((e)=> {
        this.$swal("Opss...", "Erro: " + e, "error");
      })
    },
    findAll(){
      findAll().then(result => {
        this.productList = result.data
      })
    },
    validate(obj){
      if(obj.name == undefined || obj.name == null){
        this.$swal("Opss...", "O campo nome precisa ser preenchido", "error");
        return false
      }
      if(obj.description == undefined || obj.description == null){
        this.$swal("Opss...", "O campo descrição precisa ser preenchido", "error");
        return false
      }
      if(obj.amount == undefined || obj.amount == null){
        this.$swal("Opss...", "O campo valor precisa ser preenchido", "error");
        return false
      }
      return true
    },
    formatPrice(value) {
      const val = Number(value.replace(",", "."));
      if (!val) return '0,00';
      const valueString = val.toFixed(2).replace(".", ",");
      return valueString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  }
}
</script>
