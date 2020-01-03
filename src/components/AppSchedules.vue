<template>
  <div class="container mt-4">
    <table class="table table-bordered mt-4">
      <thead class="thead-light">
        <tr>
          <th width="1">#</th>
          <th width="20%">Schedule Id</th>
          <th width="20%">From</th>
          <th width="20%">To</th>
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
        <tr v-for="(schedule, index) in schedules" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <span v-if="editIndex !== index">{{ schedule.scheduleId }}</span>
            <span v-if="editIndex === index">
              <input
                class="form-control form-control-sm"
                v-model="schedule.scheduleId"
              />
            </span>
          </td>

          <td>
            <span v-if="editIndex !== index">{{ schedule.from }}</span>
            <span v-if="editIndex === index">
              <input
                class="form-control form-control-sm"
                v-model="schedule.from"
              />
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">{{ schedule.to }}</span>
            <span v-if="editIndex === index">
              <input
                class="form-control form-control-sm"
                v-model="schedule.to"
              />
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">{{ schedule.distance }}</span>
            <span v-if="editIndex === index">
              <input
                class="form-control form-control-sm"
                type="number"
                min="0"
                v-model.number="schedule.distance"
              />
            </span>
          </td>

          <td>
            <span v-if="editIndex !== index">
              <button
                @click="edit(schedule, index)"
                class="btn btn-sm btn-outline-secondary mr-2"
              >
                Edit
              </button>
              <button
                @click="remove(schedule, index)"
                class="btn btn-sm btn-outline-secondary mr-2"
              >
                Remove
              </button>
            </span>
            <span v-else>
              <button
                class="btn btn-sm btn-outline-secondary mr-2"
                @click="cancel(schedule)"
              >
                Cancel
              </button>
              <button
                class="btn btn-sm btn-outline-secondary mr-2"
                @click="save(schedule)"
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
        Add schedule
      </button>
    </div>

    <div class="col-6 offset-6 text-right my-3">
      <button @click="submit" class="btn btn-sm btn-primary">Submit</button>
      <span>|</span>
      <button @click="cancel" class="btn btn-sm btn-primary">Cancel</button>
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
      schedules: [],
      tax: 10,
      schedulesJsObj: {}
    };
  },

  methods: {
    add() {
      this.originalData = null;
      this.schedules.push({}); //this just adds a line
      this.editIndex = this.schedules.length - 1;
    },

    edit(schedule, index) {
      this.originalData = Object.assign({}, schedule);
      this.editIndex = index;
    },

    cancel(schedule) {
      this.editIndex = null;

      if (!this.originalData) {
        this.schedules.splice(this.schedules.indexOf(schedule), 1);
        return;
      }

      Object.assign(schedule, this.originalData);
      this.originalData = null;
    },

    remove(schedule, index) {
      this.schedules.splice(index, 1);
    },

    save(schedule) {
      this.originalData = null;
      this.editIndex = null;
    },

    submit() {
      //Write routes into database

      // 	 {
      // 		 "schID1" : {
      // 			 from:
      // 			 to:
      // 			 distance:
      // 		 },
      // 		 "schid2" : {
      // 			 from:
      // 			 to:
      // 			 distance
      // 		 }

      // 	 }

      // {
      // 	from:
      // 	to:
      // 	scheduleid:
      // 	distance:

      // }
      //   const Obj1 = {};
      //   this.schedules.forEach(schedule => {
      //     Obj1.id = schedule.scheduleId;
      //     Obj1.data = schedule;
      //   });

      //   console.log('result1 foreach', Obj1);
      // fb.schedulesCollection
      //   .doc(schedule.scheduleId)
      //   .set(schedule)
      //   .then(() => {
      //     console.log('Document successfully written!');
      //   })
      //   .catch(err => {
      //     // console.log('ERR 1 ');
      //     console.log('Error writing document: ', err);
      //   });
      const schedulesJsObj = this.schedules.reduce(function(r, e) {
        r[e.scheduleId] = e;
        return r;
      }, {});
      console.log('schedulesJsObj', schedulesJsObj);

      //   // Set the "capital" field of the city 'DC'
      fb.schedulesCollection
        .doc('schedules')
        .set(schedulesJsObj)
        .then(function() {
          console.log('Document successfully updated!');
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error('Error updating document: ', error);
        });
    },

    subtotal(schedule) {
      return (
        schedule.qty * schedule.price -
        (schedule.qty * schedule.price * schedule.discount) / 100
      );
    }
  },

  computed: {
    allSubTotal() {
      return this.schedules
        .map(schedule => this.subtotal(schedule))
        .reduce((a, b) => a + b, 0);
    },

    total() {
      return this.tax
        ? this.allSubTotal + this.allSubTotal * (this.tax / 100)
        : this.allSubTotal;
    }
  },

  mounted() {
    // Load data from schedules table.

    // fb.schedulesCollection.get().then(function(querySnapshot) {
    //   querySnapshot.forEach(schedule => {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(schedule.id, ' => ', schedule.data());
    //   });
    // });

    // 	fb.schedulesCollection
    // 		.get()
    // 		.then(function(querySnapshot) {
    // 			querySnapshot.forEach(function(doc) {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, " => ", doc.data());
    // });

    // 			if (doc.exists) {
    // 				console.log('Document data:', doc.data());
    // 			} else {
    // 				// doc.data() will be undefined in this case
    // 				console.log('No such document!');
    // 			}
    // 		})
    // 		.catch(function(error) {
    // 			console.log('Error getting document:', error);
    // 		});

    fb.schedulesCollection
      .doc('schedules')
      .get()
      .then(doc => {
        if (doc.exists) {
		  console.log('Document data:', doc.data());
		  let items = doc.data();
	
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(error => {
        console.log('Error getting document:', error);
      });
  }
};
</script>

<style>
input[type='number'] {
  text-align: right;
}
</style>
