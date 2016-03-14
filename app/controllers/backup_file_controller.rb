class BackupFileController < ApplicationController

  def get_text
    puts  'action get_text has been called'

    datestr = params.require :date
    date = Date.iso8601 datestr

    # We're going to print all data from 5 days back to 15 days
    # ahead
    start_date = date - 5.days
    end_date = date + 15.days

    start_str = start_date.iso8601
    end_str = end_date.iso8601

    # Get the days
    days = Day.cached_for_calendar start_str, end_str

    sb = BackupFileTextBuilder.new

    sb.print_days days

    render json: {:text => sb.get}

  end

  class BackupFileTextBuilder

    def initialize
      @sb = StringBuilder.new
    end

    def print_days (days)
      days.sort{ |a, b| a.date <=> b.date }
          .each { |d| print_day d }
    end

    def print_day (day)
      confirmed_outings = day.outings.select { |o| o.confirmed?}
      if confirmed_outings.empty?
        # Nothing to print
        return
      end

      datestr = "#{I18n.localize day.date, :format => '%A'}, #{I18n.localize day.date, :format => :long}"
      @sb.line datestr
      @sb.line
      @sb.indent
      confirmed_outings.sort{ |a, b| a.time <=> b.time }
      .each { |o|
        print_outing o
      }
      @sb.deindent
    end

    def print_outing (outing)

      @sb.line "#{outing.time} #{outing.name}"\
                " - #{outing.free_places}/#{outing.num_available_horses}"\
                " - #{price_string outing}"
      @sb.indent
      if outing.reservations.empty?
        @sb.line '(Sense reserves)'
        @sb.line
      else
        @sb.line
        outing.reservations.each { |r| print_reservation r }
      end
      @sb.deindent
    end

    def print_reservation (r)

      mainstr = [
          ("#{r.total_people}/#{r.num_children}".ljust 5),
          ("#{r.skill_level}".ljust 10),
          ("#{r.name}".ljust 20),
          ("#{r.phone}".ljust 15),
          ((price_string r).ljust 15)
      ].join ' - '

      @sb.line mainstr

      comments = r.comments || ''
      if !comments.strip.empty?
        @sb.indent

        comment_lines = comments.lines.map &:chomp
        comment_lines[0] = "obs.: #{comment_lines[0]}"
        @sb.line comment_lines

        @sb.deindent
      end

      @sb.line

    end

    def price_string (thing_with_prices)
      return "#{thing_with_prices.price_adult} € / #{thing_with_prices.price_child} €"
    end

    def get
      @sb.get
    end

  end

  class StringBuilder

    def initialize
      @indent_level = 0
      @built = ''
    end

    def line (str='')

      if str.is_a? Array
        str.each { |x|
          line x
        }
        return
      end

      @built ||= ''

      @built += "\t" * @indent_level
      @built += str
      @built += "\n"

    end

    def indent
      @indent_level += 1
    end

    def deindent
      @indent_level -= 1
    end

    def get
      @built
    end

  end

end
