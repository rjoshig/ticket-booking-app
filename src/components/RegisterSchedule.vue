<template>
  <div class="container mt-4">
    <table class="table table-bordered mt-4">
      <thead class="thead-light">
        <tr>
          <th width="1">#</th>
          <th width="10%">From</th>
          <th width="10%">To</th>
          <th width="10%">Distance</th>
          <!-- <th width="10%">Days Operating</th>
          <th width="10%">Fare</th>
          <th width="10%">Price</th>
          <th width="10%">Discount</th>
					<th width="10%">Total</th>-->
          <th width="150">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <span v-if="editIndex !== index">{{ item.from }}</span>
            <span v-if="editIndex === index">
              <input class="form-control form-control-sm" v-model="item.from" />
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">{{ item.to }}</span>
            <span v-if="editIndex === index">
              <input class="form-control form-control-sm" v-model="item.to" />
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">{{ item.distance }}</span>
            <span v-if="editIndex === index">
              <input
                class="form-control form-control-sm"
                type="number"
                min="0"
                v-model.number="item.distance"
              />
            </span>
          </td>

          <td>
            <span v-if="editIndex !== index">
              <button
                @click="edit(item, index)"
                class="btn btn-sm btn-outline-secondary mr-2"
              >
                Edit
              </button>
              <button
                @click="remove(item, index)"
                class="btn btn-sm btn-outline-secondary mr-2"
              >
                Remove
              </button>
            </span>
            <span v-else>
              <button
                class="btn btn-sm btn-outline-secondary mr-2"
                @click="cancel(item)"
              >
                Cancel
              </button>
              <button
                class="btn btn-sm btn-outline-secondary mr-2"
                @click="save(item)"
              >
                Save
              </button>
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="col-3 offset-9 text-right my-3">
      <button v-show="!editIndex" @click="add" class="btn btn-sm btn-secondary">
        Add item
      </button>
    </div>

    <div class="col-3 offset-9">
      <!-- <div class="input-group input-group-sm mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Sub total</span>
        </div>
        <input
          class="form-control form-control-sm text-right"
          disabled
          :value="this.allSubTotal | money"
        />
			</div>-->

      <!-- <div class="input-group input-group-sm mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Tax</span>
        </div>
        <input
          class="form-control form-control-sm"
          type="number"
          v-model.number="tax"
        />
        <div class="input-group-append">
          <span class="input-group-text">%</span>
        </div>
			</div>-->

      <!-- <div class="input-group input-group-lg mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Total</span>
        </div>
        <input
          class="form-control form-control-sm text-right"
          disabled
          :value="this.total | money"
        />
			</div>-->
    </div>
  </div>
</template>

<script>
// import fb from '@/firebaseConfig.js'
const fb = require('../firebaseConfig.js');
export default {
  name: 'Uhuy',

  filters: {
    money: value =>
      new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'INR'
      }).format(value)
  },

  data() {
    return {
      editIndex: null,
      originalData: null,
      items: [],
      tax: 10
    };
  },

  methods: {
    add() {
      this.originalData = null;
      this.items.push({
        From: '',
        To: '',
        Distance: 1
      });
      this.editIndex = this.items.length - 1;
    },

    edit(item, index) {
      this.originalData = Object.assign({}, item);
      this.editIndex = index;
    },

    cancel(item) {
      this.editIndex = null;

      if (!this.originalData) {
        this.items.splice(this.items.indexOf(item), 1);
        return;
      }

      Object.assign(item, this.originalData);
      this.originalData = null;
    },

    remove(item, index) {
      this.items.splice(index, 1);
    },

    save(item) {
      this.originalData = null;
      this.editIndex = null;

      fb.schedulesCollection
        .doc()
        .set(this.items)
        .then(() => {
          console.log('Document successfully written!');
        })
        .catch(err => {
          // console.log('ERR 1 ');
          console.log('Error writing document: ', err);
        });
    },

    subtotal(item) {
      return (
        item.qty * item.price - (item.qty * item.price * item.discount) / 100
      );
    }
  },

  computed: {
    allSubTotal() {
      return this.items
        .map(item => this.subtotal(item))
        .reduce((a, b) => a + b, 0);
    },

    total() {
      return this.tax
        ? this.allSubTotal + this.allSubTotal * (this.tax / 100)
        : this.allSubTotal;
    }
  }
};
</script>

<style>
input[type='number'] {
  text-align: right;
}
</style>
