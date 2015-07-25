module ApplicationHelper

  def form_group ng_model, label, type='text'

    id = rand_str

    %Q(
        <div class="form-group">
          <label for="#{id}" class="col-sm-2 control-label">#{label}</label>
          <div class="col-sm-10">
            <input ng-model="#{ng_model}"
                   type="#{type}"
                   class="form-control"
                   id="#{id}">
          </div>
        </div>
      )
  end

  def bs_fg_begin id, label
    %Q(
        <div class="form-group">
          <label for="#{id}" class="col-sm-2 control-label">#{label}</label>
          <div class="col-sm-10">
      )
  end

  def bs_fg_end
    %q(
          </div>
        </div>
      )
  end

  private

  def rand_str
    (0...50).map { ('a'..'z').to_a[rand(26)] }.join
  end

end
