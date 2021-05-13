.class Landroidx/appcompat/widget/g$b;
.super Landroidx/appcompat/view/menu/ActionMenuItemView$b;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/appcompat/widget/g;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x2
    name = "b"
.end annotation


# instance fields
.field final synthetic a:Landroidx/appcompat/widget/g;


# direct methods
.method constructor <init>(Landroidx/appcompat/widget/g;)V
    .locals 0

    iput-object p1, p0, Landroidx/appcompat/widget/g$b;->a:Landroidx/appcompat/widget/g;

    invoke-direct {p0}, Landroidx/appcompat/view/menu/ActionMenuItemView$b;-><init>()V

    return-void
.end method


# virtual methods
.method public a()Landroidx/appcompat/view/menu/z;
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/widget/g$b;->a:Landroidx/appcompat/widget/g;

    iget-object v0, v0, Landroidx/appcompat/widget/g;->A:Landroidx/appcompat/widget/g$a;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, Landroidx/appcompat/view/menu/u;->b()Landroidx/appcompat/view/menu/s;

    move-result-object v0

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return-object v0
.end method
