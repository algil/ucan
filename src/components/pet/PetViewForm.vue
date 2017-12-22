<template>
  <v-card>
    <v-toolbar card color="white" prominent>
      <v-icon>pets</v-icon>
      <v-toolbar-title class="grey--text">
        {{ $t('pet.general.title') }}
      </v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-layout wrap>
        <v-flex xs12 sm3 justify-center class="avatar-pet">
          <v-avatar size="150px">
            <img :src="petImage" alt="avatar">
          </v-avatar>
        </v-flex>
        <v-flex xs12 sm9>
          <v-layout wrap>
            <!-- NAME -->
            <v-flex xs12 sm6>
              <v-text-field
                :label="$t('label.name')"
                v-model="pet.name"
                data-vv-name="name"
                :error-messages="errors.collect('name')"
                v-validate="'required|max:100'"
                required
              ></v-text-field>
            </v-flex>

            <!-- BREED -->
            <v-flex xs12 sm6>
              <v-text-field
                :label="$t('label.breed')"
                v-model="pet.breed"
                data-vv-name="breed"
                :error-messages="errors.collect('breed')"
                v-validate="'required|max:100'"
                required
              ></v-text-field>
            </v-flex>

            <!-- SEX -->
            <v-flex xs12>
              <v-radio-group
                row
                class="pt-0"
                :label="$t('label.gender')"
                v-model="pet.gender"
                data-vv-name="gender"
                data-vv-value-path="inputValue"
                :error-messages="errors.collect('gender')"
                v-validate="'required|in:0,1'"
                required
              >
                <v-radio :label="$t('label.male')" value="0"></v-radio>
                <v-radio :label="$t('label.female')" value="1"></v-radio>
              </v-radio-group>
            </v-flex>

            <!-- SIZE -->
            <v-flex xs12 sm6>
              <v-select
                :items="$store.state.dogSizes"
                v-model="pet.size"
                :label="$t('label.size')"
                item-text="name"
                item-value="id"
                data-vv-name="size"
                :error-messages="errors.collect('size')"
                v-validate="'required'"
                required
              >
                <template slot="selection" slot-scope="data">
                  {{ $t(data.item.name) }}
                </template>
                <template slot="item" slot-scope="data">
                  {{ $t(data.item.name) }}
                </template>
              </v-select>
            </v-flex>

            <!-- WEIGHT -->
            <v-flex xs12 sm6>
              <v-text-field
                type="number"
                :label="$t('label.weight')"
                suffix="Kg"
                v-model="pet.weight"
                data-vv-name="weight"
                :error-messages="errors.collect('weight')"
                v-validate="'required|min_value:0'"
                required
              ></v-text-field>
            </v-flex>

            <!-- BIRTHDATE -->
            <v-flex xs12 sm6>
              <v-menu
                lazy
                v-model="menu"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  :label="$t('label.birthdate')"
                  v-model="pet.birthdate"
                  data-vv-name="birthdate"
                  :error-messages="errors.collect('birthdate')"
                  v-validate="'required'"
                  append-icon="event"
                  required
                  readonly
                ></v-text-field>
                <v-date-picker
                  v-model="pet.birthdate"
                  :first-day-of-week="1"
                  locale="es-sp"
                  no-title
                  scrollable
                ></v-date-picker>
              </v-menu>
            </v-flex>

            <!-- RECEPTION AGE -->
            <v-flex xs12 sm6>
              <v-text-field
                :label="$t('label.receptionAge')"
                v-model="pet.receptionAge"
                data-vv-name="receptionAge"
                :error-messages="errors.collect('receptionAge')"
                v-validate="'required|max:100'"
                required
                :hint="$t('label.receptionAgeHint')"
              ></v-text-field>
            </v-flex>

            <!-- STERILIZED -->
            <v-flex xs12 sm6>
              <v-switch
                :label="$t('label.sterilized')"
                v-model="pet.sterilized"
                hide-details
              ></v-switch>
            </v-flex>

            <!-- PREVIOUS TRAINING -->
            <v-flex xs12 sm6>
              <v-switch
                :label="$t('label.previousTraining')"
                v-model="pet.previousTraining"
                hide-details
              ></v-switch>
            </v-flex>

            <!-- DESCRIPTION -->
            <v-flex xs12>
              <v-text-field
                :label="$t('label.descriptionDog')"
                v-model="pet.description"
                data-vv-name="description"
                :error-messages="errors.collect('description')"
                v-validate="'required|max:255'"
                required
                :hint="$t('label.descriptionDogHint')"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
  import * as EventTypes from '@/event-types';

  export default {
    name: 'pet-view-form',

    props: {
      pet: {
        required: true,
        type: Object
      }
    },

    data () {
      return {
        client: {
          name: 'Antonio Gil'
        },
        menu: false,
        date: null
      };
    },

    computed: {
      petImage () {
        // TODO: download a good pleaceholder image
        return this.pet.image ? this.pet.image : 'https://mylostpetalert.com/wp-content/themes/mlpa-child/images/nophoto.gif';
      }
    },

    mounted () {
      this.$events.on(EventTypes.FORM_ON_SAVE, this.save);
    },

    beforeDestroy () {
      this.$events.off(EventTypes.FORM_ON_SAVE, this.save);
    },

    methods: {
      async save () {
        let isValid = await this.$validator.validateAll();
        if (isValid) {
          this.$emit('save', this.pet);
        }
      },

      viewClient () {
        // TODO: Implement
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .menu
    margin 0

  .avatar-pet
    display flex

</style>
