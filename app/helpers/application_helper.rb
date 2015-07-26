module ApplicationHelper

  def bs_fg_begin id, label, options={}

    options[:columns] ||= (1..12)

    rt = ''
    rt << '<div class="form-group">' if options[:columns].begin.eql? 1
    rt << %Q(
        <label for="#{id}" class="col-sm-2 control-label">#{label}</label>
        <div class="col-sm-#{options[:columns].count-2}">
      )

    rt
  end

  def bs_fg_end options={}

    options[:columns] ||= (1..12)
    rt = '</div>'
    rt << '</div>' if options[:columns].end.eql? 12
    rt
  end

end
