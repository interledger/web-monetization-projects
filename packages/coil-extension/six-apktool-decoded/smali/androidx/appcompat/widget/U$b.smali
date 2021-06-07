.class Landroidx/appcompat/widget/U$b;
.super Landroid/database/DataSetObserver;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/appcompat/widget/U;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x2
    name = "b"
.end annotation


# instance fields
.field final synthetic a:Landroidx/appcompat/widget/U;


# direct methods
.method constructor <init>(Landroidx/appcompat/widget/U;)V
    .locals 0

    iput-object p1, p0, Landroidx/appcompat/widget/U$b;->a:Landroidx/appcompat/widget/U;

    invoke-direct {p0}, Landroid/database/DataSetObserver;-><init>()V

    return-void
.end method


# virtual methods
.method public onChanged()V
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/widget/U$b;->a:Landroidx/appcompat/widget/U;

    invoke-virtual {v0}, Landroidx/appcompat/widget/U;->b()Z

    move-result v0

    if-eqz v0, :cond_0

    iget-object v0, p0, Landroidx/appcompat/widget/U$b;->a:Landroidx/appcompat/widget/U;

    invoke-virtual {v0}, Landroidx/appcompat/widget/U;->c()V

    :cond_0
    return-void
.end method

.method public onInvalidated()V
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/widget/U$b;->a:Landroidx/appcompat/widget/U;

    invoke-virtual {v0}, Landroidx/appcompat/widget/U;->dismiss()V

    return-void
.end method
