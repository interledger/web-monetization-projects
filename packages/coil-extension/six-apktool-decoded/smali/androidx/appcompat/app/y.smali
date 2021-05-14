.class Landroidx/appcompat/app/y;
.super La/g/i/A;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Landroidx/appcompat/app/x$b;->a(La/a/c/b;)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:Landroidx/appcompat/app/x$b;


# direct methods
.method constructor <init>(Landroidx/appcompat/app/x$b;)V
    .locals 0

    iput-object p1, p0, Landroidx/appcompat/app/y;->a:Landroidx/appcompat/app/x$b;

    invoke-direct {p0}, La/g/i/A;-><init>()V

    return-void
.end method


# virtual methods
.method public b(Landroid/view/View;)V
    .locals 1

    iget-object p1, p0, Landroidx/appcompat/app/y;->a:Landroidx/appcompat/app/x$b;

    iget-object p1, p1, Landroidx/appcompat/app/x$b;->b:Landroidx/appcompat/app/x;

    iget-object p1, p1, Landroidx/appcompat/app/x;->q:Landroidx/appcompat/widget/ActionBarContextView;

    const/16 v0, 0x8

    invoke-virtual {p1, v0}, Landroidx/appcompat/widget/ActionBarContextView;->setVisibility(I)V

    iget-object p1, p0, Landroidx/appcompat/app/y;->a:Landroidx/appcompat/app/x$b;

    iget-object p1, p1, Landroidx/appcompat/app/x$b;->b:Landroidx/appcompat/app/x;

    iget-object v0, p1, Landroidx/appcompat/app/x;->r:Landroid/widget/PopupWindow;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, Landroid/widget/PopupWindow;->dismiss()V

    goto :goto_0

    :cond_0
    iget-object p1, p1, Landroidx/appcompat/app/x;->q:Landroidx/appcompat/widget/ActionBarContextView;

    invoke-virtual {p1}, Landroid/view/ViewGroup;->getParent()Landroid/view/ViewParent;

    move-result-object p1

    instance-of p1, p1, Landroid/view/View;

    if-eqz p1, :cond_1

    iget-object p1, p0, Landroidx/appcompat/app/y;->a:Landroidx/appcompat/app/x$b;

    iget-object p1, p1, Landroidx/appcompat/app/x$b;->b:Landroidx/appcompat/app/x;

    iget-object p1, p1, Landroidx/appcompat/app/x;->q:Landroidx/appcompat/widget/ActionBarContextView;

    invoke-virtual {p1}, Landroid/view/ViewGroup;->getParent()Landroid/view/ViewParent;

    move-result-object p1

    check-cast p1, Landroid/view/View;

    invoke-static {p1}, La/g/i/s;->A(Landroid/view/View;)V

    :cond_1
    :goto_0
    iget-object p1, p0, Landroidx/appcompat/app/y;->a:Landroidx/appcompat/app/x$b;

    iget-object p1, p1, Landroidx/appcompat/app/x$b;->b:Landroidx/appcompat/app/x;

    iget-object p1, p1, Landroidx/appcompat/app/x;->q:Landroidx/appcompat/widget/ActionBarContextView;

    invoke-virtual {p1}, Landroid/view/ViewGroup;->removeAllViews()V

    iget-object p1, p0, Landroidx/appcompat/app/y;->a:Landroidx/appcompat/app/x$b;

    iget-object p1, p1, Landroidx/appcompat/app/x$b;->b:Landroidx/appcompat/app/x;

    iget-object p1, p1, Landroidx/appcompat/app/x;->t:La/g/i/y;

    const/4 v0, 0x0

    invoke-virtual {p1, v0}, La/g/i/y;->a(La/g/i/z;)La/g/i/y;

    iget-object p1, p0, Landroidx/appcompat/app/y;->a:Landroidx/appcompat/app/x$b;

    iget-object p1, p1, Landroidx/appcompat/app/x$b;->b:Landroidx/appcompat/app/x;

    iput-object v0, p1, Landroidx/appcompat/app/x;->t:La/g/i/y;

    return-void
.end method
